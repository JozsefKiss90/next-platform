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
