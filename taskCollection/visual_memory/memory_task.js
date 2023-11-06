export default function runTask(gridProp,buttonProp,styles, email) {

const grid = gridProp
const status = document.getElementById('status');
const level = document.getElementById('level');
const sequence = [];
let playerSequence = [];
let sequenceCount = 1;
let attempts = 3;
status.classList.add(styles.status);

const button = buttonProp
const container = document.querySelector('.' + styles.container);

if(button != null){
    button.addEventListener('click', ()=> startTest())
}

for (let i = 0; i < 9; i++) {
    let square = document.createElement('div');
    square.classList.add(styles.square)
    square.addEventListener('click', () => playerMove(i));
    grid.appendChild(square);
}

function startTest() {
    container.style.backgroundColor = ""; 
    playerSequence = [];
    sequence.length = 0;
    status.innerHTML = "";
    level.innerHTML = "Level: " + sequenceCount;
    document.body.style.backgroundColor = "";

    let lastNum = -1;  

    for(let i=0; i<sequenceCount; i++) {
        let num;
        do {
            num = Math.floor(Math.random() * 9);
        } while(num === lastNum);  

        sequence.push(num);
        lastNum = num;  
    }

    showSequence(0);
}

function showSequence(index) {
    if(index < sequence.length) {
        grid.childNodes[sequence[index]].classList.add(styles.testSquare);
        setTimeout(() => {
            grid.childNodes[sequence[index]].classList.remove(styles.testSquare);
            showSequence(index + 1);
        }, 1000);
    }
}

function playerMove(index) {
    grid.childNodes[index].classList.add(styles.clickedSquare);
    setTimeout(() => {
        grid.childNodes[index].classList.remove(styles.clickedSquare);
    }, 200); 
    playerSequence.push(index);
    if (playerSequence.length === sequence.length) {
        setTimeout(verifySequence, 200); 
    }
}

function verifySequence() {
    for (let i = 0; i < sequence.length; i++) {
        if (sequence[i] !== playerSequence[i]) {
            status.innerHTML = `Incorrect, you have ${--attempts} attempts remaining.`;
            container.style.backgroundColor = "red"; 
            if(attempts > 0) {
                setTimeout(startTest, 1000);
                return;
            } else {
                sendData(sequenceCount - 1)
                status.innerHTML = "You have used all attempts. <br> Task completed!";
                addExitButton()
                return;
            }
        }
    }
    if(sequenceCount < 9) {
        sequenceCount++;
        attempts = 3;
        setTimeout(() => {
            container.style.backgroundColor = "#27f827"; 
        }, 200);
        setTimeout(() => {
            document.querySelector('.' + styles.container).style.backgroundColor = ""; 
        }, 900); 
        setTimeout(startTest, 1800); 
    } else {
        sendData(sequenceCount)
        status.innerHTML = "Congratulations, you completed all levels!";
        addExitButton()
    }
}

function sendData(sequenceCount) {
    
    const memorySpan = sequenceCount

    const data = {
        memorySpan,
        email,
    } 

    const options = {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(data)
    }

    fetch('/api/memory', options)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error.message);
        });
    }

    function exit() {
        window.location.href = process.env.NODE_ENV === "production" ? "https://platform-app.herokuapp.com/experiments" : "http://localhost:3000/experiments";
    } 

    function addExitButton() {
        let button = document.createElement('button');
        let textNode = document.createTextNode("Exit");
        button.appendChild(textNode);
        button.classList.add(styles.exitButton);
        let buttonContainer = document.createElement('div');
        buttonContainer.classList.add(styles.buttonContainer); 
        button.addEventListener('click', () => {
            exit() 
        })
        buttonContainer.appendChild(button);
        document.body.appendChild(buttonContainer);
    }

}