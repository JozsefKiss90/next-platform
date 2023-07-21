export default function runTask(boxRef) {
    let box = boxRef;
    let start = false;
    let startOfGreen;
    let clickedTooEarly = false;
    let reactionTimes = [];
    let trials = 0;
    
    const delay = ms => new Promise(res => setTimeout(res, ms));

    box.addEventListener('click', async () => {
        if (box.style.backgroundColor === 'blue') {
            await delay(0); 
            box.innerText = 'Wait for green';
            await startTask();
        } else if (!start) {
            box.innerText = 'Wait for green';
            start = true;
            await startTask();
        } else if (box.style.backgroundColor === 'green') {
            let rt = Date.now() - startOfGreen;
            reactionTimes.push(rt);
            trials++;
            box.innerText = 'Reaction time: ' + rt + ' ms\n\nClick to continue';
            box.style.backgroundColor = 'blue';
        } else if (box.style.backgroundColor === 'blue' && trials < 10) {
            await delay(500); // Give the user half a second to release the mouse button
            box.innerText = 'Wait for green';
            await startTask();
        } else if (trials >= 10) {
            let sum = reactionTimes.reduce((a, b) => a + b, 0);
            let avg = sum / reactionTimes.length;
            box.innerText = 'Average reaction time: ' + avg.toFixed(2) + ' ms';
        }
    });

    // The main task
    async function startTask() {
        clickedTooEarly = false; // Reset this here
        box.style.backgroundColor = 'red';
        let waitTime = Math.random() * 3000 + 2000; // 2000 to 5000 ms
        // Race the delay against the premature click
        await Promise.race([delay(waitTime), new Promise((resolve) => {
            // Add an extra 'click' listener for the premature click
            box.addEventListener('click', function listener() {
                // Only resolve if it's a premature click
                if (start && box.style.backgroundColor === 'red') {
                    clickedTooEarly = true;
                    box.style.backgroundColor = 'blue';
                    box.innerText = 'Too early response! Click to try again.';
                    resolve(); // Resolve the promise immediately
                    // Clean up by removing this listener
                    box.removeEventListener('click', listener);
                }
            });
        })]);

        if (!clickedTooEarly) { // Only proceed if the user didn't click too early
            startOfGreen = Date.now();
            box.style.backgroundColor = 'green';
            box.innerText = 'Click!';
        }
    }
}
