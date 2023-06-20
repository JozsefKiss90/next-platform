export let mins = 0;
let seconds = 10;
let tens = 0;

export function startTimer(props) {
  tens--;

  if (props.mins < 0) { 
    return;  
  } 
  
  if (tens < 0) {
    seconds--;
    tens = 99;
     
    if (seconds < 0) {
      mins--;
      seconds = 59;
      if (mins < 0) { 
        props.tens.textContent =  padNumber(0);
        props.seconds.textContent = padNumber(0);
        props.mins.textContent = padNumber(0);
        return;  
      } 
      props.mins.innerHTML = padNumber(mins);
    }
    props.seconds.innerHTML = padNumber(seconds);
  }
  props.tens.innerHTML = padNumber(tens);
}

function padNumber(number) {
  return number.toString().padStart(2, "0");
}
