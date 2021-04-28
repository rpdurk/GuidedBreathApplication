/**
 * Make an Animation to say ready, set go
 * Create an End Animation
 * Add up to 3 second countdown for inhale, hold, and exhaleHold
 * Add end function to navScript Close Modal
 * Modal time not actually working?
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

let elapsedTime = 0;

function start() {
  // Reset animation classes

  // Clear all timeouts
  timeouts.forEach(timeout => {
    clearTimeout(timeout);
  });

  // Clear all animations
  let circle = getCircle();
  // remove hold animation
  circle.removeAttribute('style');
  // remove pulse if applied
  circle.classList.remove("circle-pulse");
  // remove purple if applied
  circle.classList.remove("circlePurple");
  // remove inhale animation at start
  circle.classList.remove("circleLarge");
  // remove text animation
  let actionText = getActionText();
  actionText.innerHTML = " ";
  // Reset timeouts array
  timeouts = [];
  // Reset Elapsed Time
  let elapsedTime = 0;

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
  
  updateCountdown();
  
  addEndEarlyButton()

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
    circle.classList.remove("circlePurple");
  }

  // display text
  let actionText = getActionText();
  actionText.innerHTML = "inhale";
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
    actionText.innerHTML = "hold";
  }
  if (inhaleHold > 0 && pulseOn) {
    let circle = getCircle();
    circle.classList.add("circle-pulse");
  }
  if (inhaleHold > 0 && colorOn) {
    let circle = getCircle();
    circle.classList.add("circlePurple");
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
    circle.classList.remove("circlePurple");
  }

  playShrink();

  let actionText = getActionText();
  actionText.innerHTML = "exhale";
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
    actionText.innerHTML = "hold";
  }
  if (exhaleHold > 0 && pulseOn) {
    let circle = getCircle();
    circle.classList.add("circle-pulse");
  }
  if (exhaleHold > 0 && colorOn) {
    let circle = getCircle();
    circle.classList.add("circlePurple");
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

function getCircle() {
  return document.getElementById('circle');
}

function getActionText() {
  return document.getElementById('actionText');
}

function playExpand() {
  const expandSound = document.createElement('audio');
  expandSound.src ='assets/audio/inhaleBrit.mp3';
  if(audioOn) {
    expandSound.load();
    expandSound.play();
    // console.log('I Said Inhale!');
  }
  setTimeout(function() {
    expandSound.pause();
  }, inhale * 1000)
}

function playExpandHold() {
  const expandHoldSound = document.createElement('audio');
  expandHoldSound.src ='assets/audio/holdBrit.mp3';
  if(audioOn && inhaleHold > 0) {
    expandHoldSound.load();
    expandHoldSound.play();
    // console.log('I Said Inhale Hold!');
  }
  setTimeout(function() {
    expandHoldSound.pause();
  }, inhaleHold * 1000)
}

function playShrink() {
  const shrinkSound  = document.createElement('audio');
  shrinkSound.src ='assets/audio/exhaleBrit.mp3';
  if(audioOn) {
    shrinkSound.load();
    shrinkSound.play();
    // console.log('I Said Exhale!');
  }
  setTimeout(function() {
    shrinkSound.pause();
  }, exhale * 1000)
}

function playShrinkHold() {
  const shrinkHoldSound = document.createElement('audio');
  shrinkHoldSound.src ='assets/audio/holdBrit.mp3';
  if(audioOn && exhaleHold > 0) {
    shrinkHoldSound.load();
    shrinkHoldSound.play();
    // console.log('I Said Exhale Hold!');
  }
  setTimeout(function() {
    shrinkHoldSound.pause();
  }, exhaleHold * 1000)
}

// play finished to confirm you are done.
function playFinished() {
  const finishedSound = document.createElement('audio');
  finishedSound.src = 'assets/audio/finishedBrit_F.mp3';
  finishedSound.load();
  finishedSound.play();
}

// end animation
function endAnimation() {
  let endAnimationText = getEndAnimation();
  endAnimationText.innerHTML = "Finished!";
  playFinished();
}

function getEndAnimation() {
  return document.getElementById('actionText');
}

function endEarly() {
  let finishedAnimationText = getActionText();
  finishedAnimationText.innerHTML = finished;
}

function updateCountdown() {
  let time = duration * 60;
  setInterval(function(){
    // get the element that will show the time
    const countdownEl = document.getElementById('countdown');
    const minutes = Math.floor(time /60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownEl.innerHTML = `${minutes}:${seconds}`;
    time--;
    elapsedTime += 1;
    if(time <= 0) {
      clearInterval(time = 0)
    }
  }, 1000); 
}

function addEndEarlyButton() {
  // on start, create an end early button
  const endEarlyBtn = document.createElement('button');
  // create a button
  endEarlyBtn.type ="button";
  //add text for button 
  endEarlyBtn.innerHTML = 'End Session Early';
  // add class name to be targeted
  endEarlyBtn.className = 'endEarlyButton';
  // add button function that creates a modal. 
  endEarlyBtn.onclick = function() {
    const endEarlyModal = document.getElementById('sessionDetailsModal');
    endEarlyModal.style.display = 'block';
    // get session duration completed
    sessionDurationCompleted = elapsedTime;
    // get element and insert time.
    const timeCompleted = document.getElementById('timeCompleted');
    timeCompleted.innerHTML = formatTime(sessionDurationCompleted);

    inhaleTimeChosen = parseInt(document.getElementById('chosenInhale').innerHTML);
    const inhaleTimeUsed = document.getElementById('inhaleTime');
    inhaleTimeUsed.innerHTML = `${inhaleTimeChosen}s inhale, `;

    inhaleHoldTimeChosen = parseInt(document.getElementById('chosenInhaleHold').innerHTML);
    const inhaleHoldTimeUsed = document.getElementById('inhaleHoldTime');
    inhaleHoldTimeUsed.innerHTML = `${inhaleTimeChosen}s inhale hold, `;

    exhaleTimeChosen = parseInt(document.getElementById('chosenExhale').innerHTML);
    const exhaleTimeUsed = document.getElementById('exhaleTime');
    exhaleTimeUsed.innerHTML = `${exhaleTimeChosen}s exhale, `;
  
    exhaleHoldTimeChosen = parseInt(document.getElementById('chosenExhaleHold').innerHTML);
    const exhaleHoldTimeUsed = document.getElementById('exhaleHoldTime');
    exhaleHoldTimeUsed.innerHTML = `and ${exhaleHoldTimeChosen}s exhale hold!`;
  }

  // get the directions div
  const directionsDiv = document.getElementById('main');
  // append button
  directionsDiv.appendChild(endEarlyBtn);
}

function formatTime(seconds) {
  let minutes = parseInt(seconds / 60);
  seconds = parseInt(seconds % 60);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return ` ${minutes}:${seconds}`;
}