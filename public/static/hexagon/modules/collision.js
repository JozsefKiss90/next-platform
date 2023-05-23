import {coordinates, parameters} from './coordinates.js'
import {angle, a} from './hexagon.js'


const collisionCoordiantes = {
  A : [{x : 0, y : 0}, {x : 0, y : 0}],
  B : [{x : 0, y : 0}, {x : 0, y : 0}],
  C : [{x : 0, y : 0}, {x : 0, y : 0}],
  D : [{x : 0, y : 0}, {x : 0, y : 0}],  
  E : [{x : 0, y : 0}, {x : 0, y : 0}],
  F : [{x : 0, y : 0}, {x : 0, y : 0}],  
}

function doesLineInterceptCircle(C, radius) {

  let detectors
  let units 
  let distances

  for (let i = 0; i < 6; i++) {
    detectors = {...detectors, 
      ['v1x_' + `${i}`] : Object.values(collisionCoordiantes)[i][1].x -  Object.values(collisionCoordiantes)[i][0].x, 
      ['v1y_' + `${i}`]  : Object.values(collisionCoordiantes)[i][1].y - Object.values(collisionCoordiantes)[i][0].y,
      ['v2x_' + `${i}`]  : C.x - Object.values(collisionCoordiantes)[i][0].x,
      ['v2y_' + `${i}`]  : C.y - Object.values(collisionCoordiantes)[i][0].y,
    }
  }
  
  for (let i = 0; i < 6; i++) {
    let  j = i*4
    units = {...units,
      ['u_' + `${i}`] : (Object.values(detectors)[j+2] * Object.values(detectors)[j] + Object.values(detectors)[j+3] * Object.values(detectors)[j+1]) / 
        (Object.values(detectors)[j+1] * Object.values(detectors)[j+1] + Object.values(detectors)[j] * Object.values(detectors)[j]), 
    },
    distances = {...distances, 
      ['dist_' + `${i}`] : 0
    }
  }
  
  Object.keys(distances).forEach((key,i) => {
    let j = i*4 
    if(Object.values(units)[i] >= 0 && Object.values(units)[i] <= 1) {
      distances[key] = (Object.values(collisionCoordiantes)[i][0].x + Object.values(detectors)[j] * Object.values(units)[i] - C.x) ** 2
        + (Object.values(collisionCoordiantes)[i][0].y + Object.values(detectors)[j+1] * Object.values(units)[i] - C.y) ** 2;
    } else {
      distances[key] = Object.values(units)[i][1] < 0 ?
        (Object.values(collisionCoordiantes)[i][0].x - C.x) ** 2 + (Object.values(collisionCoordiantes)[i][0].y - C.y) ** 2 :
        (Object.values(collisionCoordiantes)[i][1].x- C.x) ** 2 + (Object.values(collisionCoordiantes)[i][1].y - C.y) ** 2;
    }
  })

  return Object.values(distances)[0] < radius * radius || Object.values(distances)[1] < radius * radius || Object.values(distances)[2] < radius * radius
    || Object.values(distances)[3] < radius * radius || Object.values(distances)[4] < radius * radius 
    || Object.values(distances)[5] < radius * radius
}
  
let len = 6

function collisionOnX() {  
  for (let i = 1; i < len; i++) { 
    Object.values(collisionCoordiantes)[i][0].x = coordinates.x * Math.cos(a * (parameters.rndInt - (len - i)) + angle * Math.PI / 180)
    Object.values(collisionCoordiantes)[i][0].y = coordinates.x * Math.sin(a * (parameters.rndInt - (len - i)) + angle * Math.PI / 180)
    Object.values(collisionCoordiantes)[i][1].x = coordinates.x * Math.cos(a * (parameters.rndInt - (len - 1 - i)) + angle * Math.PI / 180)
    Object.values(collisionCoordiantes)[i][1].y = coordinates.x * Math.sin(a * (parameters.rndInt - (len - 1 - i)) + angle * Math.PI / 180)
  }
} 

function collisionOnX_2() {
  for (let i = 2; i < len; i++) {
    Object.values(collisionCoordiantes)[i][0].x = coordinates.x * Math.cos(a * (parameters.rndInt - (len - i)) + angle * Math.PI / 180)
    Object.values(collisionCoordiantes)[i][0].y = coordinates.x * Math.sin(a * (parameters.rndInt - (len - i)) + angle * Math.PI / 180)
    Object.values(collisionCoordiantes)[i][1].x = coordinates.x * Math.cos(a * (parameters.rndInt - (len - 1 - i)) + angle * Math.PI / 180)
    Object.values(collisionCoordiantes)[i][1].y = coordinates.x * Math.sin(a * (parameters.rndInt - (len - 1 - i)) + angle * Math.PI / 180)
  }
}

function gappedColllisionOnX() {
  for (let i = 0; i < len-1; i++) {  
    if(i == 1) continue
    Object.values(collisionCoordiantes)[i][0].x = coordinates.x * Math.cos(a * (len - (len - i)) + angle * Math.PI / 180)
    Object.values(collisionCoordiantes)[i][0].y = coordinates.x * Math.sin(a * (len - (len - i)) + angle * Math.PI / 180)
    Object.values(collisionCoordiantes)[i][1].x = coordinates.x * Math.cos(a * (len - (len - 1 - i)) + angle * Math.PI / 180)
    Object.values(collisionCoordiantes)[i][1].y = coordinates.x * Math.sin(a * (len - (len - 1 - i)) + angle * Math.PI / 180)
  }
}

function collisionOnY() {
  for (let i = 1; i < len; i++) {  
    Object.values(collisionCoordiantes)[i][0].x = coordinates.y * Math.cos(a * (parameters.rndInt2 - (len - i)) + angle * Math.PI / 180)
    Object.values(collisionCoordiantes)[i][0].y = coordinates.y * Math.sin(a * (parameters.rndInt2 - (len - i)) + angle * Math.PI / 180)
    Object.values(collisionCoordiantes)[i][1].x = coordinates.y * Math.cos(a * (parameters.rndInt2 - (len - 1 - i)) + angle * Math.PI / 180)
    Object.values(collisionCoordiantes)[i][1].y = coordinates.y * Math.sin(a * (parameters.rndInt2 - (len - 1 - i)) + angle * Math.PI / 180)
  }
}

function collisionOnY_2(){
  for (let i = 2; i < len; i++) { 
    Object.values(collisionCoordiantes)[i][0].x = coordinates.y * Math.cos(a * (parameters.rndInt2 - (len - i)) + angle * Math.PI / 180)
    Object.values(collisionCoordiantes)[i][0].y = coordinates.y * Math.sin(a * (parameters.rndInt2 - (len - i)) + angle * Math.PI / 180)
    Object.values(collisionCoordiantes)[i][1].x = coordinates.y * Math.cos(a * (parameters.rndInt2 - (len - 1 - i)) + angle * Math.PI / 180)
    Object.values(collisionCoordiantes)[i][1].y = coordinates.y * Math.sin(a * (parameters.rndInt2 - (len - 1 - i)) + angle * Math.PI / 180)
  }
}

function gappedColllisionOnY() {
  for (let i = 0; i < len-1; i++) { 
    if(i == 1) continue
    Object.values(collisionCoordiantes)[i][0].x = coordinates.y * Math.cos(a * (len - (len - i)) + angle * Math.PI / 180)
    Object.values(collisionCoordiantes)[i][0].y = coordinates.y * Math.sin(a * (len - (len - i)) + angle * Math.PI / 180)
    Object.values(collisionCoordiantes)[i][1].x = coordinates.y * Math.cos(a * (len - (len - 1 - i)) + angle * Math.PI / 180)
    Object.values(collisionCoordiantes)[i][1].y = coordinates.y * Math.sin(a * (len - (len - 1 - i)) + angle * Math.PI / 180)
  }
}


function collisionOnZ() {
  for (let i = 1; i < len; i++) { 
    Object.values(collisionCoordiantes)[i][0].x = coordinates.z * Math.cos(a * (parameters.rndInt3 - (len - i)) + angle * Math.PI / 180)
    Object.values(collisionCoordiantes)[i][0].y = coordinates.z * Math.sin(a * (parameters.rndInt3 - (len - i)) + angle * Math.PI / 180)
    Object.values(collisionCoordiantes)[i][1].x = coordinates.z * Math.cos(a * (parameters.rndInt3 - (len - 1 - i)) + angle * Math.PI / 180)
    Object.values(collisionCoordiantes)[i][1].y = coordinates.z * Math.sin(a * (parameters.rndInt3 - (len - 1 - i)) + angle * Math.PI / 180)
  }
}

function collisionOnZ_2(){
  for (let i = 2; i < len; i++) {
    Object.values(collisionCoordiantes)[i][0].x = coordinates.z * Math.cos(a * (parameters.rndInt3 - (len - i)) + angle * Math.PI / 180)
    Object.values(collisionCoordiantes)[i][0].y = coordinates.z * Math.sin(a * (parameters.rndInt3 - (len - i)) + angle * Math.PI / 180)
    Object.values(collisionCoordiantes)[i][1].x = coordinates.z * Math.cos(a * (parameters.rndInt3 - (len - 1 - i)) + angle * Math.PI / 180)
    Object.values(collisionCoordiantes)[i][1].y = coordinates.z * Math.sin(a * (parameters.rndInt3 - (len - 1 - i)) + angle * Math.PI / 180)
  }
}

function gappedColllisionOnZ() {
  for (let i = 0; i < len-1; i++) {
    if(i == 1) continue
    Object.values(collisionCoordiantes)[i][0].x = coordinates.z * Math.cos(a * (len - (len - i)) + angle * Math.PI / 180)
    Object.values(collisionCoordiantes)[i][0].y = coordinates.z * Math.sin(a * (len - (len - i)) + angle * Math.PI / 180)
    Object.values(collisionCoordiantes)[i][1].x = coordinates.z * Math.cos(a * (len - (len - 1 - i)) + angle * Math.PI / 180)
    Object.values(collisionCoordiantes)[i][1].y = coordinates.z * Math.sin(a * (len - (len - 1 - i)) + angle * Math.PI / 180)
  }
}

function handleCollisonOnX(x, gap, params) {
  if(x < 260 && gap !== true ) {
    if(params.rotate == 5 && params.gappedOrNot > 1) {
      collisionOnX()
    }
    else if(params.gappedOrNot <= 1) {
      gappedColllisionOnX()
    }
    else if( params.rotate == 4) {
      collisionOnX_2()
    }
  }
}

function handleCollisonOnY(y, gap, params) {
  if(y < 260 && gap !== true ) {
    if(params.rotate_2 == 5 && params.gappedOrNot2 > 1) {
      collisionOnY()
    }
    else if(params.gappedOrNot2 <= 1) {
      gappedColllisionOnY()
    }
    else if(params.rotate_2  == 4) {
      collisionOnY_2()
    }
  }
}

function handleCollisonOnZ(z, gap, params) {
  if(z < 260 && gap !== true ) {
    if(params.rotate_3 == 5 && params.gappedOrNot3 > 1) {
      collisionOnZ()
    }
    else if(params.gappedOrNot3 <= 1) {
      gappedColllisionOnZ()
    }
    else if(params.rotate_3  == 4) {
      collisionOnZ_2()
    }
  }
}

function handleCollisons(coordinates, gapped, parameters) {
  handleCollisonOnX(coordinates.x, gapped, parameters)
  handleCollisonOnY(coordinates.y, gapped, parameters)
  handleCollisonOnZ(coordinates.z, gapped, parameters)
}

export {collisionCoordiantes,handleCollisons, doesLineInterceptCircle, handleCollisonOnX, handleCollisonOnY, handleCollisonOnZ}