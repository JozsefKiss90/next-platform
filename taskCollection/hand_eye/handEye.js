let myIntervalX

function exit() {
    window.location.href = process.env.NODE_ENV === "production" ? "https://platform-app.herokuapp.com/experiments" : "http://localhost:3000/experiments";
}

function finishTask(performance,myIntervalX,performanceX,performanceY, instruction, styles, email) {
    clearInterval(myIntervalX);

    for (let i = 0; i < performanceX.length; i++) {
        performance.push(performanceX[i] + performanceY[i]);
    }
    const data = {
        performance,
        email
    }
    fetch('/api/handeye', {
        method : 'POST',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body : JSON.stringify(data)
    })
    .then(res => res.json)
    .catch(err => console.log(err)) 
    instruction.innerHTML = 'Feladat teljesítve!';

    addExitButton(styles)
}


function addExitButton(styles) {
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

export default function runTask(email, trialsProp, styles) {
    let instruction = document.createElement('div');
    instruction.setAttribute("id", "instruction")
    let textNode = document.createTextNode("Kattints a zöld területre, hogy a mozgó körök megálljanak. Próbáld a középponthoz minnél közelebb megállítani őket.");
    instruction.appendChild(textNode);
    instruction.classList.add(styles.textElement);
    let instructionContainer = document.getElementById('container-2');
    instructionContainer.appendChild(instruction);
   
    var elementX = document.getElementById('moveMeX')
    var elementY = document.getElementById('moveMeY')
    var container = document.getElementById('container-2')
    var trials = 0
    document.getElementById('trials').innerHTML = `${trials}/12`
    elementY.style.top = "-20px"
    var posX = -20
    var startPosX = -20
    var posY = -20
    var startPosY = -20 
    var speed = 1
    var xIsMoving = false
    var yIsMoving = false
    var maxPos = 190
    var increaseSpeed = 0
    var xIsStopped = true
    var yIsStopped = false
    var performanceX = []
    var performanceY = []
    var performance = []

    function init() {
      
        elementX = document.getElementById('moveMeX')
        elementY = document.getElementById('moveMeY')
        elementY.style.top = "-20px"
        trials += 1
        trialsProp = `${trials}/20`
        posX = -20
        startPosX = -20
        posY = -20
        startPosY = -20
        increaseSpeed += 1
        if( increaseSpeed % 2 == 0) {
            speed += 1
        }       
        if ( speed == 4 || speed == 8 ) {
            maxPos = 188
        }
        else if ( speed == 9) {
            maxPos = 187
        }
        else {
            maxPos = 190
        }
        xIsMoving = !xIsMoving;
    }

    init();
 
    let stopX = () => {
        if(xIsMoving){
            xIsMoving = !xIsMoving;
            yIsMoving = !yIsMoving;
            performanceX.push(Math.abs(posX + 20 - 110));
        }else if(yIsMoving){
            yIsMoving = !yIsMoving;
            performanceY.push(Math.abs(posY + 20 - 110));
            if (trials == 12) {   
                finishTask(performance,myIntervalX,performanceX, performanceY, instruction, styles, email);
            } else {
                startCountdown();
            }
        }
    };
    
    function startCountdown() {
        var timeleft = 3;
        var downloadTimer = setInterval(function(){ 
            if(timeleft <= 0){
                clearInterval(downloadTimer);
                document.getElementById("countdown").innerHTML = "";
                init();
            } else {
                document.getElementById("countdown").innerHTML = timeleft;
            }
            timeleft -= 1;
        }, 1000);
    }
    
    container.addEventListener("mousedown", () => {
        stopX()
       
    });

     myIntervalX = setInterval(function () { 
        document.getElementById('trials').innerHTML = `${trials}/12`
        if (xIsMoving) {
            if (startPosX == -20) {
                posX += speed
                elementX.style.left = posX + 'px'
                if (posX == maxPos) {
                    startPosX = maxPos
                }
            }
            else if (startPosX == maxPos) {
                posX -= speed
                elementX.style.left = posX + 'px'
                if (posX == -20) {
                     startPosX = -20
                }
            }
        }
        else if(yIsMoving){
            if (startPosY == -20) {
                posY += speed
                elementY.style.top = posY + 'px'
                if (posY == maxPos) {
                    startPosY = maxPos
                }
            }
            else if (startPosY == maxPos) {
                posY -= speed
                elementY.style.top = posY + 'px'
                if (posY == -20) {
                    startPosY = -20
                }
            }
        }
    }, 10);
    return myIntervalX;
}


