async function drawQuadrantOne(ctx) {
    ctx.beginPath()
    ctx.moveTo(400 , 250 )
    ctx.lineTo(-250, 250)
    ctx.moveTo(410, 250)
    ctx.lineTo(110, -250)
    ctx.lineTo(-250, 250)
    ctx.strokeStyle = "#6d6d6e"
    ctx.fillStyle = "#6d6d6e"
    ctx.fill()
    ctx.stroke()
  }

async function drawQuadrantTwo(ctx) {
    ctx.beginPath()
    ctx.moveTo(400, 248)
    ctx.lineTo( 700, -250)
    ctx.lineTo(110, -250)
    ctx.strokeStyle = "#9d9d9e"
    ctx.fillStyle = "#9d9d9e"
    ctx.fill()
    ctx.stroke()
  }

async function drawQuadrantThree(ctx) {
    ctx.beginPath()
    ctx.moveTo(400, 250)
    ctx.lineTo( 1020, 252);
    ctx.lineTo( 690, -250)
    ctx.strokeStyle = "#6d6d6e"
    ctx.fillStyle = '#6d6d6e'
    ctx.fill();
    ctx.stroke();
  }

async function drawQuadrantFour(ctx) {
    ctx.beginPath()
    ctx.moveTo(398, 250)
    ctx.lineTo( 690, 750);
    ctx.lineTo( 1000, 250);
    ctx.strokeStyle = "#9d9d9e"
    ctx.fillStyle = "#9d9d9e"
    ctx.fill()
    ctx.stroke();
  }

async function drawQuadrantFive(ctx) {
    ctx.beginPath()
    ctx.moveTo(400, 250)
    ctx.lineTo( 100, 750);
    ctx.lineTo( 690, 750);
    ctx.strokeStyle = "#6d6d6e"
    ctx.fillStyle = '#6d6d6e'
    ctx.fill();
    ctx.stroke();
  }

async function drawQuadrantSix(ctx) {
    ctx.beginPath()
    ctx.moveTo(400, 250)
    ctx.lineTo( 110, 750);
    ctx.lineTo(-250, 250)
    ctx.strokeStyle = "#9d9d9e"
    ctx.fillStyle = '#9d9d9e'
    ctx.fill()
    ctx.stroke();
  }

  export default async function drawBackgorund(angle,ctx) {
    angle *= Math.PI / 180
    ctx.save()
    ctx.translate(-400, -250)
    ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2); 
    ctx.rotate(angle); 
    ctx.translate(-(ctx.canvas.width/2), -(ctx.canvas.height/2));
    await drawQuadrantOne(ctx)
    await drawQuadrantTwo(ctx)
    await drawQuadrantThree(ctx)
    await drawQuadrantFour(ctx)
    await drawQuadrantFive(ctx)
    await drawQuadrantSix(ctx) 
    ctx.restore()
  }


export { drawQuadrantOne, drawQuadrantTwo, drawQuadrantThree, drawQuadrantFour, drawQuadrantFive, drawQuadrantSix};