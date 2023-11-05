export default function runTask(email, canvasProp, styles) {

    let instruction = document.createElement('div');
    instruction.setAttribute("id", "instruction");
    let paragraph1 = document.createElement('p');
    let textNode = document.createTextNode("Próbáld a kurzort a mozgó körön tartani.");
    paragraph1.appendChild(textNode);
    let paragraph2 = document.createElement('p');
    let textNode_2 = document.createTextNode("Kattints a körre a kezdéshez.");
    paragraph2.appendChild(textNode_2);
    instruction.appendChild(paragraph1);
    instruction.appendChild(paragraph2);
    instruction.classList.add(styles.textElement);
    let instructionContainer = document.getElementById('canvas-container');
    instructionContainer.appendChild(instruction);


    const canvas = canvasProp;
    const ctx = canvas.getContext("2d");

    const centerX_large = canvas.width / 2;
    const centerY_large = canvas.height  - 300;
    const radius_large = 200;
    let radius_small = 50;
    let angle = -Math.PI / 2;
    let isMoving = false;

    let smallCircleColor = '#db2500';

    let isMouseOver = false;
    let hoverStartTime = 0; 
    let totalHoverDuration = 0;
    let hoverDurations = [];  

    let started = false

    let currentTrial = 0;
    const maxTrials =1;
    let currentAngleIncrement = Math.PI / 180; 

    function isMouseOverSmallCircle(mouseX, mouseY) {
        const smallCircleX = centerX_large + radius_large * Math.cos(angle);
        const smallCircleY = centerY_large + radius_large * Math.sin(angle);

        const dx = mouseX - smallCircleX;
        const dy = mouseY - smallCircleY;
        return Math.sqrt(dx * dx + dy * dy) < radius_small;
    }

    canvas.addEventListener('mousemove', function(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        if (isMouseOverSmallCircle(mouseX, mouseY)) {
        if (!isMouseOver && started) {
            isMouseOver = true;
            hoverStartTime = Date.now(); 
        }
        smallCircleColor = '#00f040'; 
        } else {
        if (isMouseOver) {
            totalHoverDuration += Date.now() - hoverStartTime; 
            isMouseOver = false;
        }
        smallCircleColor = '#db2500';
        }
    
        if (!isMoving) {
        drawCircles();
        }
    });

    function drawCircles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(centerX_large, centerY_large, radius_large, 0, 2 * Math.PI);
    ctx.strokeStyle = "#999999";
    ctx.lineWidth = 3;
    ctx.stroke();

    const smallCircleX = centerX_large + radius_large * Math.cos(angle);
    const smallCircleY = centerY_large + radius_large * Math.sin(angle);
    ctx.strokeStyle = smallCircleColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(smallCircleX, smallCircleY, radius_small, 0, 2 * Math.PI);
    ctx.fillStyle = smallCircleColor;
    ctx.fill();
    ctx.stroke();

    if (isMoving) {
        angle += currentAngleIncrement;
        if (angle >= 2 * Math.PI - Math.PI / 2) {
        if (isMouseOver && started) {
            totalHoverDuration += Date.now() - hoverStartTime; 
            isMouseOver = false; 
        }

        hoverDurations.push(totalHoverDuration); 
        totalHoverDuration = 0; 
        currentTrial++;
        angle = -Math.PI / 2;

        if (currentTrial < maxTrials) {
            console.log(currentTrial)
            radius_small -= 5;
            currentAngleIncrement += Math.PI / 180 / 20;
        } else {
            isMoving = false;
            const performance = hoverDurations
            console.log(performance)
            const data = {
                performance,
                email
            }
            createTaskFinishedText(styles)
            addExitButton(styles)
            sendData(data)
        }
        }
        requestAnimationFrame(drawCircles);
    }
    }

    drawCircles();

    canvas.addEventListener('click', function() {
        started = true;
        if (currentTrial < maxTrials) {
            isMoving = !isMoving;
            if (isMoving) {
                if (isMouseOver && started) {
                    hoverStartTime = Date.now(); 
                }
                requestAnimationFrame(drawCircles);
                let instructionElement = document.getElementById('instruction');

                if (instructionElement) {
                    instructionElement.remove();
                }
            }
        }
    });
    
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

    function exit() {
        window.location.href = process.env.NODE_ENV === "production" ? "https://platform-app.herokuapp.com" : "http://localhost:3000";
    }

    function createTaskFinishedText(styles) {
        let instruction = document.createElement('div');
        instruction.setAttribute("id", "instruction");
        let paragraph1 = document.createElement('p');
        let textNode = document.createTextNode("Feladat teljesítve");
        paragraph1.appendChild(textNode);
        instruction.appendChild(paragraph1);
        instruction.classList.add(styles.textElement);
        instructionContainer.appendChild(instruction);
    }

    function sendData(data){
        fetch('/api/handeye', {
            method: 'POST',
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(data)
        })
        .then(res => {
            console.log('Status Code:', res.status); 
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json(); 
        })
        .then(data => console.log('Data:', data)) 
        .catch(err => console.log('Error:', err)); 
        
    }
    
}