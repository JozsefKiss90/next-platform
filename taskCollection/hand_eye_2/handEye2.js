export default function runTask(email, canvasProp) {
    console.log(canvasProp)
    const canvas = canvasProp;
    const ctx = canvas.getContext("2d");

    const centerX_large = canvas.width / 2;
    const centerY_large = canvas.height  - 230;
    const radius_large = 200;
    let radius_small = 50;
    let angle = -Math.PI / 2;
    let isMoving = false;

    let smallCircleColor = '#db2500';

    let isMouseOver = false;
    let hoverStartTime = 0; 
    let totalHoverDuration = 0;
    let hoverDurations = [];  

    let currentTrial = 0;
    const maxTrials = 5;
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
        if (!isMouseOver) {
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
    console.log(totalHoverDuration)
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
        if (isMouseOver) {
            totalHoverDuration += Date.now() - hoverStartTime; 
            isMouseOver = false; 
        }

        hoverDurations.push(totalHoverDuration); 
        totalHoverDuration = 0; 
        currentTrial++;
        angle = -Math.PI / 2;

        if (currentTrial < maxTrials) {
            radius_small -= 5;
            currentAngleIncrement += Math.PI / 180 / 20;
        } else {
            isMoving = false;
            console.log("Trials complete. Hover durations (ms):", hoverDurations);
        }
        }
        requestAnimationFrame(drawCircles);
    }
    }

    drawCircles();

    canvas.addEventListener('click', function() {
    if (currentTrial < maxTrials) {
        isMoving = !isMoving;
        if (isMoving) {
        if (isMouseOver) {
            hoverStartTime = Date.now(); 
        }
        requestAnimationFrame(drawCircles);
        }
    }
    });
}