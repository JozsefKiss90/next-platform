import {drawGappedHex, drawWall, drawHexagon} from "./walls.js";
import { c, circleCenter } from "./hexagon.js";

async function drawCenter(r, radianAngle,ctx){
    ctx.save();
    await drawHexagon(r, radianAngle, ctx)
    ctx.restore();
}

async function drawSolidWall(r, radianAngle, num, rot, ctx){
    ctx.save();
    //console.log("CONTEXT IS HERE: " + ctx) is logged as CONTEXT IS HERE: [object CanvasRenderingContext2D]
    await drawWall(r, num, rot, radianAngle, ctx);
    ctx.restore();
}

async function drawGappedWall(r, radianAngle,ctx){ 
    ctx.save();
    await drawGappedHex(r, radianAngle,ctx)
    ctx.restore();
}

async function drawController(n, col,ctx) {
    ctx.save()
    ctx.beginPath();
    circleCenter.x = 110 * Math.cos(c * n)
    circleCenter.y = 110 * Math.sin(c * n)
    ctx.arc(110 * Math.cos(c * n), 110 * Math.sin(c * n), 10, 0, 2 * Math.PI)
    ctx.fillStyle = col;
    ctx.fill();
    ctx.stroke();
    ctx.restore()
  }

export{drawSolidWall, drawGappedWall, drawCenter, drawController}