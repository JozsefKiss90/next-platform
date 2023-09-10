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

// Create the grid
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
    for(let i=0; i<sequenceCount; i++) {
        sequence.push(Math.floor(Math.random() * 9));
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
    }, 200); // Remove the clicked-square class after 0.2s
    playerSequence.push(index);
    if (playerSequence.length === sequence.length) {
        setTimeout(verifySequence, 200); // We delay the verification for the transition to complete
    }
}

function verifySequence() {
    for (let i = 0; i < sequence.length; i++) {
        if (sequence[i] !== playerSequence[i]) {
            status.innerHTML = `Incorrect, you have ${--attempts} attempts remaining.`;
            document.body.style.backgroundColor = "red";
            if(attempts > 0) {
                setTimeout(startTest, 1000); // Restart the level after 1s delay if there are attempts left
                return;
            } else {
                status.innerHTML = "You have used all attempts. Please start again.";
                sequenceCount = 1;
                attempts = 3; // Reset the attempts count
                return;
            }
        }
    }
    if(sequenceCount < 10) {
        sequenceCount++;
        attempts = 3;
        setTimeout(() => {
            document.body.style.backgroundColor = "green"; 
        }, 200);
        setTimeout(() => {
            document.body.style.backgroundColor = ""; // Reset background color after 700ms
        }, 900);
        setTimeout(startTest, 1800); // Call startTest after 2000ms
    } else {
        status.innerHTML = "Congratulations, you completed all levels!";
    }
}

}