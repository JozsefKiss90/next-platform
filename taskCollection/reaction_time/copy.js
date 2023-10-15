export default function runTask(boxRef, email) {
    let currentState = 'init';
    let reactionTimes = [];
    let startOfGreen;
    let trials = 0;
    boxRef.style.fontSize = '2rem'

    function handleMouseDown(e) {
        e.preventDefault();
        switch (currentState) {
            case 'init':
            case 'blue':
                currentState = 'waiting';
                boxRef.innerText = 'Várj a zöldre.';
                startTask();
                break;
            case 'green':
                let rt = performance.now() - startOfGreen;
                reactionTimes.push(rt);
                trials++;

                if (trials === 10) {
                    sendData();
                    currentState = 'finished';
                    boxRef.style.backgroundColor = '#c59700';

                    let sum = reactionTimes.reduce((a, b) => a + b, 0);
                    let avg = sum / reactionTimes.length;
                    boxRef.innerText = 'Átlagos reakció idő: ' + avg.toFixed(2) + ' ms\n\nKattints a kilépéshez.';       
                    boxRef.removeEventListener('mousedown', handleMouseDown);

                    boxRef.addEventListener('mousedown', (e) => { 
                        e.preventDefault();
                        e.stopPropagation();
                        exit();
                    }, true);
                    
     
                } else {
                    currentState = 'blue';
                    boxRef.innerText = 'Reakció idő: ' + rt.toFixed() + ' ms\n\nKattints a folytatáshoz';
                    boxRef.style.backgroundColor = 'blue';
                }
                break;
            case 'waiting':
                boxRef.style.backgroundColor = 'red';
                boxRef.innerText = 'Túl korai válasz! Újrakezdés...';
                resetTrial();
                break;
        }
    }
    boxRef.addEventListener('click', handleMouseDown, true);

    let timeoutId;  // Declare a variable to hold the timeout ID
    
    function resetTrial() {
        clearTimeout(timeoutId);  // Clear the previous timeout
    
        setTimeout(() => {
            currentState = 'waiting';
            boxRef.innerText = 'Várj a zöldre.';
            startTask();
        }, 1000);
    }
    

    function exit() {
        window.location.href = process.env.NODE_ENV === "production" ? "https://platform-app.herokuapp.com" : "http://localhost:3000";
    }

    function sendData() {
        let sum = reactionTimes.reduce((a, b) => a + b, 0);
        let avg = sum / reactionTimes.length;
        boxRef.innerText = 'Átlagos reakció idő: ' + avg.toFixed(2) + ' ms';

        const values = {
            rt: avg,
            email: email,
        }

        const options = {
            method: "POST",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(values)
        }

        fetch('/api/rt', options)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
            })
            .catch(error => {
                console.error("There was a problem with the fetch operation:", error.message);
            });
    }

    function startTask() {
        boxRef.style.backgroundColor = 'red';
        let waitTime = Math.random() * 3000 + 1000;
    
        // Store the timeout ID
        timeoutId = setTimeout(() => {
            if (currentState === 'waiting') {
                startOfGreen = performance.now();
                boxRef.style.backgroundColor = 'green';
                boxRef.innerText = 'Kattints!';
                currentState = 'green';
            }
        }, waitTime);
    }
}



export default function runTask(boxRef, email) {
    let box = boxRef;
    let start = false;
    let startOfGreen;
    let clickedTooEarly = false;
    let reactionTimes = [];
    let trials = 0;
    let finished = false

    const delay = ms => new Promise(res => setTimeout(res, ms));

    box.addEventListener('click', async () => {
        if (box.style.backgroundColor === 'blue' || box.style.backgroundColor === '#c59700') {
            await delay(0); 
            if(trials == 2) {
              await sendData()
            } else {
            box.innerText = 'Várj a zöldre.';
            await startTask();
            }
        }
        else if (!start) {
            box.innerText = 'Várj a zöldre.';
            start = true; 
            await startTask();
        } else if (box.style.backgroundColor === 'green' || box.style.backgroundColor === '#c59700') {
            let rt = Date.now() - startOfGreen;
            reactionTimes.push(rt);
            ++trials;
            if(trials == 2) {
                let sum = reactionTimes.reduce((a, b) => a + b, 0);
                let avg = sum / reactionTimes.length;
                box.innerText = 'Átlagos reakció idő: ' + avg.toFixed(2) + '\n\nFeladat teljesítve! ' + '\n\nKattints a befejezéshez.';
                box.style.backgroundColor = '#c59700'
                box.addEventListener('click', exit);
            } else {
                box.innerText = 'Reakció idő: ' + rt + ' ms\n\nKattints a folytatáshoz';
                box.style.backgroundColor = 'blue';
            }
        } else if (box.style.backgroundColor === 'blue') {
            await delay(500); 
            box.innerText = 'Várj a zöldre';
            await startTask();
        }
    });

    async function exit() {
        window.location.href = "http://localhost:3000";
        }

    async function sendData() {
        finished = true
    
        let sum = reactionTimes.reduce((a, b) => a + b, 0);
        let avg = sum / reactionTimes.length;
        box.innerText = 'Átlagos reakció idő: ' + avg.toFixed(2) + ' ms';
        let values = {
            rt : avg, 
            email: email,
          }
          
        const options = {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(values) 
        }
        
        await fetch('/api/rt', options)
        .then(res => res.json())
        .catch(err => console.log(err))
    }

    async function startTask() {
        clickedTooEarly = false; 
        box.style.backgroundColor = 'red';
        let waitTime = Math.random() * 3000 + 1000; 
 
        await Promise.race([delay(waitTime), new Promise((resolve) => {
           
            box.addEventListener('click', function listener() {
      
                if (start && box.style.backgroundColor === 'red') {
                    clickedTooEarly = true;
                    box.style.backgroundColor = 'blue';
                    box.innerText = 'Túl korai válasz! Kattints az újrakezdéshez.';
                    resolve(); 
                    box.removeEventListener('click', listener);
                }
            });
        })]);

        if (!clickedTooEarly) { 
            startOfGreen = Date.now();
            box.style.backgroundColor = 'green';
            box.innerText = 'Kattints!';
        }


        /*if (trials == 2) {
            finished = true
            let sum = reactionTimes.reduce((a, b) => a + b, 0);
            let avg = sum / reactionTimes.length;
            box.innerText = 'Average reaction time: ' + avg.toFixed(2) + ' ms';
            let values = {
                rt : avg, 
                email: email,
              }

            const options = {
            method: "POST",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(values) 
            }
            
            await fetch('/api/rt', options)
            .then(res => res.json())
            .catch(err => console.log(err))
        }*/
    }
}
