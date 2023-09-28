export default function runTask(gridProp,buttonProp,styles) {

const grid = gridProp
const status = document.getElementById('status');
const level = document.getElementById('level');
const sequence = [];
let playerSequence = [];
let sequenceCount = 1;
let attempts = 3;
status.classList.add(styles.status);

const button = buttonProp
button.addEventListener('click', ()=> startTest())

for (let i = 0; i < 9; i++) {
    let square = document.createElement('div');
    square.classList.add(styles.square)
    square.addEventListener('click', () => playerMove(i));
    grid.appendChild(square);
}

function startTest() {
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
            document.body.style.backgroundColor = "red";
            if(attempts > 0) {
                setTimeout(startTest, 1000);
                return;
            } else {
                status.innerHTML = "You have used all attempts. Please start again.";
                sequenceCount = 1;
                attempts = 3; 
                return;
            }
        }
    }
    if(sequenceCount < 10) {
        sequenceCount++;
        attempts = 3;
        setTimeout(() => {
            document.body.style.backgroundColor = "#27f827"; 
        }, 200);
        setTimeout(() => {
            document.body.style.backgroundColor = ""; 
        }, 900); 
        setTimeout(startTest, 1800); 
    } else {
        status.innerHTML = "Congratulations, you completed all levels!";
    }
}

}