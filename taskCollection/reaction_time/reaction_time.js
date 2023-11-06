export default function runTask(email,boxRef) {

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
    boxRef.addEventListener('mousedown', handleMouseDown, true);

    let timeoutId;  
    
    function resetTrial() {
        clearTimeout(timeoutId); 
    
        setTimeout(() => {
            currentState = 'waiting';
            boxRef.innerText = 'Várj a zöldre.';
            startTask();
        }, 1000);
    }
    

    function exit() {
        window.location.href = process.env.NODE_ENV === "production" ? "https://platform-app.herokuapp.com/experiments" : "http://localhost:3000/experiments";
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