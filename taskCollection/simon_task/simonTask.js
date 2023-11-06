export default function(email, containerRef,instructionsRef, buttonRef, styles) {

    const instructionsElement = instructionsRef
    const startButton = buttonRef
    const container = containerRef
    console.log(containerRef,instructionsRef, buttonRef)
    startButton.addEventListener('click', () => {
        instructionsElement.style.display = 'none';
        startButton.style.display = 'none';
        runTask();
    });
 
    const trials = [
        { condition: "left  leftresponse  compatible", position: -200, stimulus: "bal", response: "a" },
        { condition: "right leftresponse  incompatible", position: 200, stimulus: "bal", response: "a" },
        { condition: "right rightresponse compatible", position: 200, stimulus: "jobb", response: "l" },
        { condition: "left  rightresponse incompatible", position: -200, stimulus: "jobb", response: "l" }
    ];

    async function runTask() {
        const results = [];
        for (let i = 0; i < 30; i++) {
            await new Promise(r => setTimeout(r, 500));
            const trial = trials[Math.floor(Math.random() * trials.length)];
            const result = await runTrial(trial);
            results.push(result);
        }
        provideFeedback(results);
    }

    async function runTrial(trial) {
        return new Promise(resolve => {
            const stimulusDiv = createStimulus(trial.stimulus, trial.position);
            const fixationDiv = createFixation();
            
            container.appendChild(fixationDiv);
            setTimeout(() => {
                if (container.contains(fixationDiv)) {
                    container.removeChild(fixationDiv);
                }
                container.appendChild(stimulusDiv);
            }, 1000);
    
            let startTime = Date.now();
            
            const keyListener = (e) => {
                if (container.contains(stimulusDiv) && (e.key === trial.response || e.key === (trial.response === 'a' ? 'l' : 'a'))) {
                    container.removeChild(stimulusDiv);
                    
                    let rt = Date.now() - startTime;
                    let status = e.key === trial.response ? "correct" : "incorrect";
                    
                    if (status === "incorrect") {
                        const errorDiv = createError();
                        container.appendChild(errorDiv);
                        setTimeout(() => {
                            if (container.contains(errorDiv)) {
                                container.removeChild(errorDiv);
                            }
                            resolve({ status, rt, condition: trial.condition });
                        }, 1000);
                    } else {
                        resolve({ status, rt, condition: trial.condition });
                    }
                    
                    document.removeEventListener("keypress", keyListener);
                }
            };
    
            document.addEventListener("keypress", keyListener);
    
            setTimeout(() => {
                document.removeEventListener("keypress", keyListener);
                if (container.contains(stimulusDiv)) {
                    container.removeChild(stimulusDiv);
                }
                resolve({ status: "no response", rt: null, condition: trial.condition });
            }, 5000); 
        });
    }    
    
    function createStimulus(text, position) {
        const div = document.createElement("div");
        div.className = styles.stimulus;
        div.textContent = text;
        div.style.position = "relative";
        div.style.left = position + "px";
        return div;
    }

    function createFixation() {
        const div = document.createElement("div");
        div.className = styles.fixation;
        div.textContent = "+";
        return div;
    }

    function createError() {
        const div = document.createElement("div");
        div.className = styles.error;
        div.textContent = "Rossz válasz!";
        return div;
    }

    function provideFeedback(results) {
        const compatibleRTs = results.filter(r => r.condition.includes('compatible') && r.status === 'correct').map(r => r.rt);
        const incompatibleRTs = results.filter(r => r.condition.includes('incompatible') && r.status === 'correct').map(r => r.rt);
        const correctResponses = results.filter(r => r.status === 'correct').length;
        const correctPercent = (correctResponses / results.length) * 100;
                
        const avgCompatibleRT = compatibleRTs.reduce((a, b) => a + b, 0) / compatibleRTs.length;
        const avgIncompatibleRT = incompatibleRTs.reduce((a, b) => a + b, 0) / incompatibleRTs.length;
        const simonEffect = avgIncompatibleRT - avgCompatibleRT;

        const feedbackDiv = document.createElement("div");
        feedbackDiv.className = styles.feedback;
        feedbackDiv.innerHTML = `
            <p>Feladat teljesítve!</p>
            <p>Nyomj meg egy gombot a kilépéshez</p>
            `;
        container.appendChild(feedbackDiv);
    
        const redirectTo = process.env.NODE_ENV === "production" ? "https://platform-app.herokuapp.com/experiments" : "http://localhost:3000/experiments";

        const exitOnKeyPress = (event) => {
            window.location.href = redirectTo;
            document.removeEventListener('keydown', exitOnKeyPress);
        };
        document.addEventListener('keydown', exitOnKeyPress);

        const data = {
            performance: {
                correctPercent: correctPercent,
                avgCompatibleRT: avgCompatibleRT,
                avgIncompatibleRT: avgIncompatibleRT,
                simonEffect: simonEffect
            },
            email: email
        }
        
        const options = {
            method: "POST",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(data)
        }

        fetch('/api/simonTask', options)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
            })
            .catch(error => {
                console.error("There was a problem with the fetch operation:", error.message);
            }) 
    }
}