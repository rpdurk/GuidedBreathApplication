let endTime = 0;

let inhale = 0;
let inhaleHold = 0;
let exhale = 0;
let exhaleHold = 0;
let duration = 0;

function start() {
  // Get values
  // Time to expand
  inhale = parseInt(document.getElementById('chosenInhale').innerHTML);
  // Time to hold at expanded -> do some effect
  inhaleHold = parseInt(document.getElementById('chosenInhaleHold').innerHTML);
  // time to shrink
  exhale = parseInt(document.getElementById('chosenExhale').innerHTML);
  // Time to hold at shrunk position -> do some effect
  exhaleHold = parseInt(document.getElementById('chosenExhaleHold').innerHTML);
  // total time for actions to take place
  duration = parseInt(document.getElementById('chosenDuration').innerHTML);
  console.log(inhale, inhaleHold, exhale, exhaleHold, duration);

  // Reset timer
  endTime = new Date((new Date()).getTime() + (duration * 60 * 1000));

  expand();
}

function expand() {
  if (shouldEnd()) {
    shrink(true);
  }

  // do animation
  let circle = getCircle();
  circle.style.height = "40vh";
  circle.style.width = "40vh";
  circle.style.transition = "all " + inhale + "s ease";
  console.log("Expanding!");

  // Make the circle expand
  setTimeout(function() {
    holdExpand();
  }, inhale * 1000);
}

function holdExpand() {
  if (shouldEnd()) {
    shrink(true);
  }

  // do animation
  console.log("Holding after expand!");
  
  setTimeout(function() {
    shrink();
  }, inhaleHold * 1000);
}

function shrink(end) {
  // Do animation
  console.log("Shrinking!");
  let circle = getCircle();
  circle.style.height = "30vh";
  circle.style.width = "30vh";
  circle.style.transition = "all " + exhale + "s ease";
  
  if (end || shouldEnd()) {
    return;
  }

  setTimeout(function() {
    holdShrink();
  }, exhale * 1000);
}

function holdShrink() {
  // do animation
  console.log("Holding after shrink!");

  if (shouldEnd()) {
    shrink(true);
  }

  setTimeout(function() {
    expand();
  }, exhaleHold * 1000);
}

function shouldEnd() {
  return (new Date()) > endTime;
}

function getCircle() {
  return document.getElementById('circle');
}