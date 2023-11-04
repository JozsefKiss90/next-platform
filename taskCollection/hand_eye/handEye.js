let myIntervalX

function exit() {
    window.location.href = process.env.NODE_ENV === "production" ? "https://platform-app.herokuapp.com" : "http://localhost:3000";
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

function addInstruction(styles) { 
    let instruction = document.createElement('div');
    instruction.setAttribute("id", "instruction")
    let textNode = document.createTextNode("Kattints a zöld területre, hogy a mozgó körök megálljanak. Próbáld a középponthoz minnél közelebb megállítani őket.");
    instruction.appendChild(textNode);
    instruction.classList.add(styles.textElement);
    let instructionContainer = document.getElementById('container-2');
    //instructionContainer.classList.add(styles.instructionContainer); 
    instructionContainer.appendChild(instruction);
    //document.body.appendChild(instructionContainer);
}

export default function runTask(trialsProp, email, styles) {

    let instruction = document.createElement('div');
    instruction.setAttribute("id", "instruction")
    let textNode = document.createTextNode("Kattints a zöld területre, hogy a mozgó körök megálljanak. Próbáld a középponthoz minnél közelebb megállítani őket.");
    instruction.appendChild(textNode);
    instruction.classList.add(styles.textElement);
    let instructionContainer = document.getElementById('container-2');
    //instructionContainer.classList.add(styles.instructionContainer); 
    instructionContainer.appendChild(instruction);
   
    var elementX = document.getElementById('moveMeX')
    var elementY = document.getElementById('moveMeY')
    var container = document.getElementById('container-2')
    var trials = 0
    document.getElementById('trials').innerHTML = `${trials}/19`
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
        console.log(trialsProp)
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
        }else if(yIsMoving){
            yIsMoving = !yIsMoving;
            var timeleft = 3;
            var downloadTimer = setInterval(function(){ 
            if(timeleft <= 0){
                clearInterval(downloadTimer);
                document.getElementById("countdown").innerHTML = "";
                init()
            } else {
                trialsProp = ""
                document.getElementById("countdown").innerHTML = timeleft;
            }
            timeleft -= 1;
            }, 1000);
        }
    }
    container.addEventListener("mousedown", () => {
        stopX()
        if(xIsStopped === true) {
            xIsStopped = !xIsStopped
            yIsStopped =! yIsStopped
            performanceX.push( Math.abs(posX+20-110))
        }
        else if (yIsStopped === true) {
            xIsStopped = !xIsStopped
            yIsStopped =! yIsStopped
            performanceY.push(Math.abs(posY+20-110))
        }
    });

     myIntervalX = setInterval(function () {
        document.getElementById('trials').innerHTML = `${trials}/12`
        if(trials == 2) {   
            clearInterval(myIntervalX)
            for (let i = 0; i < performanceX.length; i++) {
                performance.push(performanceX[i] + performanceY[i])
            }
            const data = {
                performance,
                email
            }
           /* fetch('/api/handeye', {
                method : 'POST',
                headers: {"Content-type": "application/json; charset=UTF-8"},
                body : data
            })
            .then(res => res.json)
            .then(data => window.location.href = '/')
            .catch(err => console.log(err))  */
            instruction.innerHTML = 'Feladat teljesítve!';

            addExitButton(styles)
        }
        else if (xIsMoving) {
            if (startPosX == -20) {
                posX += speed
                elementX.style.left = posX + 'px'
                if (posX == maxPos) {
                    startPosX = maxPos
                }
            }
            else if (startPosX == maxPos) {
                posX -= speed
                //console.log(posX)
                elementX.style.left = posX + 'px'
                if (posX == -20) {
                     startPosX = -20
                }
            }
        }
        else if(yIsMoving){
            if (startPosY == -20) {
                posY += speed
                //console.log(posY)
                elementY.style.top = posY + 'px'
                if (posY == maxPos) {
                    startPosY = maxPos
                }
            }
            else if (startPosY == maxPos) {
                posY -= speed
                //console.log(posY)
                elementY.style.top = posY + 'px'
                if (posY == -20) {
                    startPosY = -20
                }
            }
        }
    }, 10);
    return myIntervalX;
}
 



