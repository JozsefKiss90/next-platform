export default function runTask(email, trialsProp) {
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

    var myIntervalX = setInterval(function () {
        console.log(trials)
        if(trials == 10) {   
            clearInterval(myIntervalX)
            for (let i = 0; i < performanceX.length; i++) {
                performance.push(performanceX[i] + performanceY[i])
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
            .then(data => console.log(data))
            .catch(err => console.log(err))  
            window.location.href = '/';
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
}
 



