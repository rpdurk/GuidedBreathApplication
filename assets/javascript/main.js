/**
 * Make an Animation to say ready, set go
 * Create an End Animation
 * Refactor Audio Clips based on examples
 * Refactor reset into a function
 * Alter 1 circle to 6 (blossoming flower) & pulse to rotation
 */

let endTime = 0;
let timeouts = [];

let inhale = 0;
let inhaleHold = 0;
let exhale = 0;
let exhaleHold = 0;
let duration = 0;

function start() {
  // Reset animation classes

  // Clear all timeouts
  timeouts.forEach(timeout => {
    clearTimeout(timeout);
  });

  // Clear all animations
  let circle = getCircle();
  // remove hold animation
  // circle.style.removeProperty('transition');
  circle.removeAttribute('style');
  circle.classList.remove("circle-pulse");
  // remove inhale animation at start
  circle.classList.remove("circleLarge");
  // remove text animation
  let actionText = getActionText();
  actionText.innerHTML = " ";
  // Reset timeouts array
  timeouts = [];

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

  // elapsedTime();

  // Reset timer
  endTime = new Date((new Date()).getTime() + (duration * 60 * 1000));
  const timeout = setTimeout(function() {
    expand();
  }, 1000);
  timeouts.push(timeout);
}

function expand() {
  if (shouldEnd()) {
    shrink(true);
  }

  // call audio sound function
  playExpand();

  // If exhaleHold Animation was done, remove during exhale animation
  if (exhaleHold > 0) {
    let circle = getCircle();
    circle.classList.remove("circle-pulse");
  }

  // display text
  let actionText = getActionText();
  actionText.innerHTML = "Inhale";
  // do animation for inhale
  let circle = getCircle();
  circle.style.transition = "all " + inhale + "s linear";
  circle.classList.add("circleLarge");
  console.log("Expanding!");

  const timeout = setTimeout(function() {
    holdExpand();
  }, inhale * 1000);
  timeouts.push(timeout);
}

function holdExpand() {
  if (shouldEnd()) {
    shrink(true);
  }

  playExpandHold();

  if (inhaleHold > 0) {
    let actionText = getActionText();
    actionText.innerHTML = "Hold";
    let circle = getCircle();
    circle.classList.add("circle-pulse");
  }
  console.log("Holding after expand!");

  const timeout = setTimeout(function() {
    shrink();
  }, inhaleHold * 1000);
  timeouts.push(timeout);
}

function shrink(end) {
  if (inhaleHold > 0) {
    let circle = getCircle();
    circle.classList.remove("circle-pulse");
  }

  playShrink();

  let actionText = getActionText();
  actionText.innerHTML = "Exhale";
  let circle = getCircle();
  circle.style.transition = "all " + exhale + "s linear";
  circle.classList.remove("circleLarge");
  console.log("Shrinking!");

  if (end || shouldEnd()) {
    return;
  }

  const timeout = setTimeout(function() {
    holdShrink();
  }, exhale * 1000);
  timeouts.push(timeout);
}

function holdShrink() {
   if (exhaleHold > 0) {
    let actionText = getActionText();
    actionText.innerHTML = "Hold";
    let circle = getCircle();
    circle.classList.add("circle-pulse");
  }

  console.log("Holding after shrink!");

  playShrinkHold();

  if (shouldEnd()) {
    shrink(true);
  }

  const timeout = setTimeout(function() {
    expand();
  }, exhaleHold * 1000);
  timeouts.push(timeout);
}

function shouldEnd() {
  return (new Date()) > endTime;
}

// function elapsedTime() {
//   startTime = Date.now();
//   var elapsedTime = Date.now() - startTime;
//   var minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
//   var seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
//   actualElapsedTime = setInterval(function() {
//   document.getElementById('elapsedTime').innerHTML = minutes +':' + seconds;
//   }, 1000);
//   return actualElapsedTime;
// }

function getCircle() {
  return document.getElementById('circle');
}

function getActionText() {
  return document.getElementById('actionText');
}

function playExpand() {
  let expandSound = document.getElementById('inhale');
  // const expandSound = new Audio('../audio/inhaleBrit.mp3);
  if(audioOn) {
    expandSound.load();
    expandSound.play();
    console.log('I Said Inhale!');
  }
  setTimeout(function() {
    expandSound.pause();
  }, inhale * 1000)
}

function playExpandHold() {
  let expandHoldSound = document.getElementById('hold1');
  if(audioOn && inhaleHold > 0) {
    expandHoldSound.load();
    expandHoldSound.play();
    console.log('I Said Inhale Hold!');
  }
  setTimeout(function() {
    expandHoldSound.pause();
  }, inhaleHold * 1000)
}

function playShrink() {
  let shrinkSound = document.getElementById('exhale');
  if(audioOn) {
    shrinkSound.load();
    shrinkSound.play();
    console.log('I Said Exhale!');
  }
  setTimeout(function() {
    shrinkSound.pause();
  }, exhale * 1000)
}

function playShrinkHold() {
  let shrinkHoldSound = document.getElementById('hold2');
  if(audioOn && exhaleHold > 0) {
    shrinkHoldSound.load();
    shrinkHoldSound.play();
    console.log('I Said Exhale Hold!');
  }
  setTimeout(function() {
    shrinkHoldSound.pause();
  }, exhaleHold * 1000)
}