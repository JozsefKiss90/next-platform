export default function(email, containerRef,instructionsRef, buttonRef, styles) {

    const instructionsElement = instructionsRef
    const startButton = buttonRef
    const container = containerRef
    console.log(containerRef,instructionsRef, buttonRef)
    startButton.addEventListener('click', () => {
        instructionsElement.style.display = 'none';
        startButton.style.display = 'none';
        console.log("wtf")
        runTask();
    });
 
    const trials = [
        { condition: "left  leftresponse  compatible", position: -200, stimulus: "left", response: "a" },
        { condition: "right leftresponse  incompatible", position: 200, stimulus: "left", response: "a" },
        { condition: "right rightresponse compatible", position: 200, stimulus: "right", response: "l" },
        { condition: "left  rightresponse incompatible", position: -200, stimulus: "right", response: "l" }
    ];

    async function runTask() {
        const results = [];
        for (let i = 0; i < 3; i++) {
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
                container.removeChild(fixationDiv);
                container.appendChild(stimulusDiv);
            }, 1000);

            let startTime = Date.now();

            function keyListener(e) {
                if (e.key === trial.response || e.key === (trial.response === 'a' ? 'l' : 'a')) {
                    document.removeEventListener("keypress", keyListener);
                    container.removeChild(stimulusDiv);
                    let status = e.key === trial.response ? "correct" : "incorrect";
                    if (status === "incorrect") {
                        const errorDiv = createError();
                        container.appendChild(errorDiv);
                        setTimeout(() => { 
                            container.removeChild(errorDiv);
                        }, 1000);
                    }
                    let rt = Date.now() - startTime;
                    resolve({ status: status, rt: rt, condition: trial.condition });
                }
            }
            document.addEventListener("keypress", keyListener);
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
        div.textContent = "Incorrect Response!";
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
            <p>Average RT for compatible trials: ${avgCompatibleRT.toFixed(2)} ms</p>
            <p>Average RT for incompatible trials: ${avgIncompatibleRT.toFixed(2)} ms</p>
            <p>Simon effect (Incompatible - Compatible): ${simonEffect.toFixed(2)} ms</p>
        `;
        container.appendChild(feedbackDiv);

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
            });
    }
}