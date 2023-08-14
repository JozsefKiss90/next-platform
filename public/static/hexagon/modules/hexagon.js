import  drawBackgorund  from "./background.js"
import {drawCenter, drawController} from "./draw.js"
import {keyDownHandler, keyUpHandler, rightPressed, leftPressed} from "./handlers.js"
import {coordinates, parameters, moveCoordiantes, drawCoordinates} from './coordinates.js'
import {doesLineInterceptCircle, handleCollisons, collisionCoordinates} from "./collision.js"
import {startTimer} from "./timer.js"   
import {touchStartHandler, touchEndHandler, touchRight, touchLeft} from './touchHandlers.js'
import { mins } from "./timer.js"

export const a = 2 * Math.PI / 6
export const c = 2 * Math.PI / 180
export const circleCenter = {x : 0, y : 0}
export let angle = -10

let requestSent = false; 

export default function runTask(email,redirectCallback, props) {
  

  let color
  let n = 0

  let Interval
  (async function () { 
      clearInterval(Interval);
      Interval = setInterval(() => startTimer(props), 10);
  })()

  document.addEventListener("keydown", keyDownHandler, false) 
  document.addEventListener("keyup", keyUpHandler, false)

  document.addEventListener("touchstart", touchStartHandler, false);
  document.addEventListener("touchend", touchEndHandler, false);

  let errors = document.getElementById("countErrors")
  errors.innerHTML = -1
  let previousState = false

  async function getCanvasContext(canvas){
    const ctx = canvas.getContext('2d')
    return ctx;
  } 

  async function animate(){
    const ctx = await getCanvasContext(props.canvas);
    requestAnimationFrame(animate)
    moveCoordiantes()
    if (requestSent) { 
      return
    }
    if (touchRight) {
      n += 2;
    } else if (touchLeft) {
        n -= 2;
    }
    if(rightPressed) {
      n += 2
    }
    else if(leftPressed) {
      n -= 2
    }
    let gapped 
    angle += -1
    const intersects = doesLineInterceptCircle(circleCenter, 24)
    color = intersects ? "red" : "white"
    let currentState = intersects
    previousState == false && currentState == true ? errors.innerHTML ++ : errors.innerHTML
    intersects == true ? previousState = true : previousState = false
    ctx.clearRect(0, 0, props.canvas.width, props.canvas.height);
    ctx.save()
    ctx.translate(400, 250)
    ctx.globalCompositeOperation = "source-over"
    await drawBackgorund(angle,ctx)
    await drawCoordinates(ctx)
    await drawCenter(70, angle,ctx)
    await drawController(n, color,ctx) 
    /*Object.values(collisionCoordinates).forEach(coord => {
      coord.forEach(point => {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI, false);
          ctx.fillStyle = 'red';  // color the points green
          ctx.fill();
          ctx.closePath();
      });
  });*/
    ctx.restore()
    handleCollisons(coordinates, gapped, parameters)
    if (mins < 0 && !requestSent) { 
      clearInterval(Interval)
      const data = {
        errorCount: parseInt(errors.innerHTML),
        email: email
      };
      console.log(data)
      fetch("/api/hexagon", {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(data)
      })
      .then(res=>res.json())
      .then(data=>console.log(data))
      requestSent = true;
      redirectCallback()
      return
    } 
  }
  requestAnimationFrame(animate)
}