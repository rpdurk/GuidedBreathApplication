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

  // if audio is on, play noise
  if (audioOn) {
      playExpand();
  }

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
  circle.style.height = "40vh";
  circle.style.width = "40vh";
  circle.style.transition = "all " + inhale + "s linear";
  console.log("Expanding!");

  setTimeout(function() {
    holdExpand();
  }, inhale * 1000);
}

function holdExpand() {
  if (shouldEnd()) {
    shrink(true);
  }

  if (audioOn && inhaleHold > 0) {
    playExpandHold();
  }

  if (inhaleHold > 0) {
    let actionText = getActionText();
    actionText.innerHTML = "Hold";
    let circle = getCircle();
    circle.classList.add("circle-pulse");
  }
  console.log("Holding after expand!");

  setTimeout(function() {
    shrink();
  }, inhaleHold * 1000);
}

function shrink(end) {
  if (inhaleHold > 0) {
    let circle = getCircle();
    circle.classList.remove("circle-pulse");
  }

  if (audioOn) {
    playShrink();
  }

  let actionText = getActionText();
  actionText.innerHTML = "Exhale";
  
  let circle = getCircle();
  circle.style.height = "30vh";
  circle.style.width = "30vh";
  circle.style.transition = "all " + exhale + "s linear";
  console.log("Shrinking!");

  if (end || shouldEnd()) {
    return;
  }

  setTimeout(function() {
    holdShrink();
  }, exhale * 1000);
}

function holdShrink() {
   if (exhaleHold > 0) {
    let actionText = getActionText();
    actionText.innerHTML = "Hold";
    let circle = getCircle();
    circle.classList.add("circle-pulse");
  }

  console.log("Holding after shrink!");

   if (audioOn && exhaleHold > 0) {
    playShrinkHold();
  }

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

function getActionText() {
  return document.getElementById('actionText');
}

function playExpand() {
  let expandSound = document.getElementById('inhale');
  expandSound.play();
  setTimeout(function() {expandSound.pause();}, inhale * 1000)
}

function playShrink() {
  let shrinkSound = document.getElementById('exhale');
  shrinkSound.play();
  setTimeout(function() {shrinkSound.pause();}, exhale * 1000)
}

function playExpandHold() {
  let expandHoldSound = document.getElementById('hold1');
  expandHoldSound.play();
  setTimeout(function() {expandHoldSound.pause();}, exhaleHold * 1000)
}

function playShrinkHold() {
  let shrinkHoldSound = document.getElementById('hold2');
  shrinkHoldSound.play();
  setTimeout(function() {shrinkHoldSound.pause();}, inhaleHold * 1000)
}