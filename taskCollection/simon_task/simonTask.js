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
        for (let i = 0; i < 2; i++) {
            await new Promise(r => setTimeout(r, 500));
            const trial = trials[Math.floor(Math.random() * trials.length)];
            const result = await runTrial(trial);
            results.push(result);
        }
        provideFeedback(results);
    }

    async function runTrial(trial) {
        return new Promise(resolve => {
            // Create the stimulus and fixation elements.
            const stimulusDiv = createStimulus(trial.stimulus, trial.position);
            const fixationDiv = createFixation();
            
            // Insert fixation, then after 1s replace with stimulus.
            container.appendChild(fixationDiv);
            setTimeout(() => {
                if (container.contains(fixationDiv)) {
                    container.removeChild(fixationDiv);
                }
                container.appendChild(stimulusDiv);
            }, 1000);
    
            let startTime = Date.now();
            
            // Listener for keypresses, specific to this trial.
            const keyListener = (e) => {
                if (container.contains(stimulusDiv) && (e.key === trial.response || e.key === (trial.response === 'a' ? 'l' : 'a'))) {
                    // Remove the stimulus once a key is pressed.
                    container.removeChild(stimulusDiv);
                    
                    // Record the response time and status.
                    let rt = Date.now() - startTime;
                    let status = e.key === trial.response ? "correct" : "incorrect";
                    
                    // If incorrect, show error, then resolve after 1s.
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
                    
                    // Remove this listener to prevent it from affecting other trials.
                    document.removeEventListener("keypress", keyListener);
                }
            };
    
            // Attach the listener, will only be active during this trial.
            document.addEventListener("keypress", keyListener);
    
            // Also set a timeout to remove the listener and stimulus in case no key is pressed.
            // This will cover the case where a user doesn't press any key.
            setTimeout(() => {
                document.removeEventListener("keypress", keyListener);
                if (container.contains(stimulusDiv)) {
                    container.removeChild(stimulusDiv);
                }
                // Resolve with a "no response" status if no key was pressed.
                resolve({ status: "no response", rt: null, condition: trial.condition });
            }, 5000); // Assuming a 5s period for the user to respond.
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
    
        const redirectTo = process.env.NODE_ENV === "production" ? "https://platform-app.herokuapp.com" : "http://localhost:3000";
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

       /* fetch('/api/simonTask', options)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
            })
            .catch(error => {
                console.error("There was a problem with the fetch operation:", error.message);
            });*/
    }
}