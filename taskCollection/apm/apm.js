export default function runTask(email, containerProp, setDisplayInstruction, styles) {

    const instruction = document.getElementById('instuction');
    if(instruction != null) {
        instruction.innerHTML = "Kattintsd végig csökkenő sorrendben a  körökön belül lévő számokat,<br /> amilyen gyorsan csak tudod."
    }
    const randomRange = (min, max) => {
        return Math.random() * (max - min) + min
    }
    console.log('run')
    let trials = 50

    let zIndex = 999  

    let zArray = [0,1,2,3,4,5]

    var firstElement = document.createElement("div")
    firstElement.classList.add("circle");
    var secondElement
    var thirdElement
    var fourthElement 
    var fifthElement
    var sixthElement

    var container = containerProp

    function init(container) { 

        firstElement.innerHTML = trials
        firstElement.style.left = randomRange(0, 500) + 'px'
        firstElement.style.top = randomRange(0, 150) + 'px'
        firstElement.style.zIndex = 99
        firstElement.setAttribute("id", `order_${trials}`);

        secondElement = document.createElement("div")
        secondElement.classList.add("circle");
        secondElement.innerHTML = trials-1
        secondElement.style.left = randomRange(0, 500) + 'px'
        secondElement.style.top = randomRange(0, 150) + 'px'
        secondElement.style.zIndex = 98
        secondElement.setAttribute("id", `order_${trials-1}`);

        thirdElement = document.createElement("div")
        thirdElement.classList.add("circle");
        thirdElement.innerHTML = trials-2
        thirdElement.style.left = randomRange(0, 500) + 'px'
        thirdElement.style.top = randomRange(0, 150) + 'px'
        thirdElement.style.zIndex = 97
        thirdElement.setAttribute("id", `order_${trials-2}`);

        fourthElement = document.createElement("div")
        fourthElement.classList.add("circle");
        fourthElement.innerHTML = trials-3
        fourthElement.style.left = randomRange(0, 500) + 'px'
        fourthElement.style.top = randomRange(0, 150) + 'px'
        fourthElement.style.zIndex = 96
        fourthElement.setAttribute("id", `order_${trials-3}`);

        fifthElement = document.createElement("div")
        fifthElement.classList.add("circle");
        fifthElement.innerHTML = trials-4
        fifthElement.style.left = randomRange(0, 500) + 'px'
        fifthElement.style.top = randomRange(0, 150) + 'px'
        fifthElement.style.zIndex = 95
        fifthElement.setAttribute("id", `order_${trials-4}`);

        sixthElement = document.createElement("div")
        sixthElement.classList.add("circle");
        sixthElement.innerHTML = trials-5
        sixthElement.style.left = randomRange(0, 500) + 'px'
        sixthElement.style.top = randomRange(0, 150) + 'px'
        sixthElement.style.zIndex = 94
        sixthElement.setAttribute("id", `order_${trials-5}`);
         
        container.appendChild(firstElement)
        container.appendChild(secondElement)
        container.appendChild(thirdElement)
        container.appendChild(fourthElement)
        container.appendChild(fifthElement)
        container.appendChild(sixthElement)
    }

    init(container)
    let mins = 0
    let seconds = 0
    let tens = 0
    let appendTens = document.getElementById("tens")
    let appendSeconds = document.getElementById("seconds")
    let appendMins = document.getElementById("mins")
    let Interval;
    let timeToFinish
    let minuteString 
    let secondString 
    let minuteNumber
    let secondNumber

    firstElement.onclick = function() {
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
    }
    function startTimer () {
        tens++; 
        timeToFinish = document.getElementById("finishTime").childNodes[0].innerHTML + document.getElementById("finishTime").childNodes[2].innerHTML
        minuteString = document.getElementById("finishTime").childNodes[0].innerHTML;
        secondString = document.getElementById("finishTime").childNodes[2].innerHTML;
        secondNumber = parseInt(secondString);
        minuteNumber = parseInt(minuteString);
        console.log(minuteNumber + " " + secondNumber)
        
        if(tens <= 9){
            appendTens.innerHTML = "0" + tens;
            }
        if (tens > 9){
            appendTens.innerHTML = tens;
            } 
        if (tens > 99) {
            seconds++;
            appendSeconds.innerHTML = "0" + seconds;
            tens = 0;
            appendTens.innerHTML = "0" + 0;
            }
        if (seconds > 9){
            appendSeconds.innerHTML = seconds;
        if (seconds > 59){
            mins++
            appendMins.innerHTML = "0" + mins;
            seconds = 0
            appendSeconds.innerHTML = "0" + 0;
            }
        }
    }

    const handleOrder = (displayprop) => {
       
        function handler_1(event){
                displayprop(false)
                event.target.style.left = randomRange(0, 500) + 'px'
                event.target.style.top = randomRange(0, 150) + 'px'
                event.target.style.zIndex = zArray[0]
                secondElement.style.zIndex = zArray[5]
                thirdElement.style.zIndex = zArray[4]
                fourthElement.style.zIndex = zArray[3]
                fifthElement.style.zIndex = zArray[2]
                sixthElement.style.zIndex = zArray[1]
                firstElement.innerHTML = trials - 6
                if (firstElement.innerHTML == -4) {
                firstElement.remove()
                }
                this.removeEventListener('mousedown', handler_1)
                secondElement.addEventListener("mousedown", handler_2)
                trials -= 1
        }

        function handler_2(event){
                event.target.style.left = randomRange(0, 500) + 'px'
                event.target.style.top = randomRange(0, 150) + 'px'
                event.target.style.zIndex = zArray[0]
                firstElement.style.zIndex = zArray[1]
                thirdElement.style.zIndex = zArray[5]
                fourthElement.style.zIndex = zArray[4]
                fifthElement.style.zIndex = zArray[3]
                sixthElement.style.zIndex = zArray[2]
                secondElement.innerHTML = trials - 6
                if (secondElement.innerHTML == -5) {
                    secondElement.remove()
                    clearInterval(Interval);
                    var performance = document.getElementById("finishTime").childNodes[0].innerHTML + document.getElementById("finishTime").childNodes[2].innerHTML
                    var data = {
                        performance : performance, 
                        email : email 
                      }
                    const endpoint = "/api/apm"
                    addExitButton()
                    setDisplayInstruction(true)
                    fetch(endpoint, {
                        method: "POST",
                        headers: {"Content-type": "application/json; charset=UTF-8"},
                        body: JSON.stringify(data)
                    })
                    .then(response => response.json()) 
                    .then(json => console.log(json))
                    .catch(err => console.log(err)) 
                }
                this.removeEventListener('mousedown', handler_2)
                thirdElement.addEventListener("mousedown", handler_3)
                trials -= 1
        }

        function handler_3(event){
                event.target.style.left = randomRange(0, 500) + 'px'
                event.target.style.top = randomRange(0, 150) + 'px'
                event.target.style.zIndex = zArray[0]
                firstElement.style.zIndex = zArray[2]
                secondElement.style.zIndex = zArray[1]
                fourthElement.style.zIndex = zArray[5]
                fifthElement.style.zIndex = zArray[4]
                sixthElement.style.zIndex = zArray[3]
                thirdElement.innerHTML = trials - 6
                if (thirdElement.innerHTML == 0) {
                    thirdElement.remove()
                }
                this.removeEventListener('mousedown', handler_3)
                fourthElement.addEventListener("mousedown", handler_4)
                trials -= 1
        }

        function handler_4(event){
                event.target.style.left = randomRange(0, 500) + 'px'
                event.target.style.top = randomRange(0, 150) + 'px'
                event.target.style.zIndex = zArray[0]
                firstElement.style.zIndex = zArray[3]
                secondElement.style.zIndex = zArray[2]
                thirdElement.style.zIndex = zArray[1]
                fifthElement.style.zIndex = zArray[5]
                sixthElement.style.zIndex = zArray[4]
                fourthElement.innerHTML = trials - 6
                if (fourthElement.innerHTML == -1) {
                    fourthElement.remove()
                }
                this.removeEventListener('mousedown', handler_4)
                fifthElement.addEventListener("mousedown", handler_5)
                trials -= 1
        }

        function handler_5(event){
                event.target.style.left = randomRange(0, 500) + 'px'
                event.target.style.top = randomRange(0, 150) + 'px'
                event.target.style.zIndex = zArray[0]
                firstElement.style.zIndex = zArray[4] 
                secondElement.style.zIndex = zArray[3]
                thirdElement.style.zIndex = zArray[2]
                fourthElement.style.zIndex = zArray[1]
                sixthElement.style.zIndex = zArray[5]
                fifthElement.innerHTML = trials - 6
                if (fifthElement.innerHTML == -2) {
                    fifthElement.remove()
                }
                this.removeEventListener('mousedown', handler_5)
                sixthElement.addEventListener("mousedown", handler_6)
                trials -= 1
        }

        function handler_6(event){
            event.target.style.left = randomRange(0, 500) + 'px'
            event.target.style.top = randomRange(0, 150) + 'px'
            event.target.style.zIndex = zArray[0]
            firstElement.style.zIndex = zArray[5]
            secondElement.style.zIndex = zArray[4]
            thirdElement.style.zIndex = zArray[3]
            fourthElement.style.zIndex = zArray[2]
            fifthElement.style.zIndex = zArray[1]
            sixthElement.innerHTML = trials - 6
            if (sixthElement.innerHTML == -3) {
                sixthElement.remove()
            }
            this.removeEventListener('mousedown', handler_6)
            firstElement.addEventListener("mousedown", handler_1)
            trials -= 1
        }

        firstElement.addEventListener('mousedown', handler_1)
        firstElement.addEventListener('mousedown', function() {
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
        })
    }

    handleOrder(setDisplayInstruction)

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
    //return takarító függvény
}