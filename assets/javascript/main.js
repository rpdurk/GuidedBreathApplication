// Audio Files
// Add checkbox for audio playbacks
// get files for audio
// add function to play audio based on time of action
// loop through audio files over 1 second or play audiofile for a specific amount of time.
// trigger audio play for each step
// let audioFiles = [
//   sound1 = '../audio/sound1.mp3',
//   sound2 = '../audio/sound2.mp3',
//   inhale = '../audio/Inhale.m4a',
//   exhale = '../audio/Exhale.m4a',
//   hold = '../audio/Hold.m4a',
// ];

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

  // Make the circle expand
  setTimeout(function() {
    holdExpand();
  }, inhale * 1000);
}

function holdExpand() {
  if (shouldEnd()) {
    shrink(true);
  }
   // if audio is on, play noise
   if (audioOn) {
      playExpandHold();
  }

  // do hold animation for inhale hold
  if (inhaleHold > 0) {
    // display text
    let actionText = getActionText();
    actionText.innerHTML = "Hold";
    // hold animation
    let circle = getCircle();
    circle.classList.add("circle-pulse");
  }
  console.log("Holding after expand!");

  // setTimeout(function() {
  //   playExpand();
  //   console.log('We are playing line 96!')
  // }, inhaleHold * 1000);

  setTimeout(function() {
    shrink();
  }, inhaleHold * 1000);
}

function shrink(end) {
  // If inhaleHold Animation was done, remove during exhale animation
  if (inhaleHold > 0) {
    let circle = getCircle();
    // remove pulse 
    circle.classList.remove("circle-pulse");
  }

  // if audio is on, play noise
  if (audioOn) {
    playShrink();
  }

  // Do Shrink Animation
    // display text
  let actionText = getActionText();
  actionText.innerHTML = "Exhale";
  console.log("Shrinking!");
  let circle = getCircle();
  circle.style.height = "30vh";
  circle.style.width = "30vh";
  circle.style.transition = "all " + exhale + "s linear";
  
  if (end || shouldEnd()) {
    return;
  }


  setTimeout(function() {
    holdShrink();
  }, exhale * 1000);
}

function holdShrink() {
   // do hold animation for inhale hold
   if (exhaleHold > 0) {
    // display text
    let actionText = getActionText();
    actionText.innerHTML = "Hold";
    // animation for exhaleHold
    let circle = getCircle();
    circle.classList.add("circle-pulse");
  }
   // if audio is on, play noise
   if (audioOn) {
    playShrinkHold();
  }

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

function getActionText() {
  return document.getElementById('actionText');
}

/**sound function********************************************** */
// next two lines didn't work????
// var sound1 = new Audio();
// sound1.src = 'sound1.mp3';

function playExpand() {
  let expandSound = document.getElementById('sound1');
  expandSound.play();
  setTimeout(function() {expandSound.pause();}, inhale * 1000)
}

function playShrink() {
  let shrinkSound = document.getElementById('sound2');
  shrinkSound.play();
  setTimeout(function() {shrinkSound.pause();}, exhale * 1000)
  // return document.getElementById('sound2').play();
}

function playExpandHold() {
  let expandHoldSound = document.getElementById('sheep1');
  expandHoldSound.play();
  setTimeout(function() {expandHoldSound.pause();}, exhaleHold * 1000)
  // return document.getElementById('sheep1').play();
}

function playShrinkHold() {
  let shrinkHoldSound = document.getElementById('space1');
  shrinkHoldSound.play();
  setTimeout(function() {shrinkHoldSound.pause();}, inhaleHold * 1000)
  // return document.getElementById('space1').play();
}