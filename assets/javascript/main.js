/**
 * Refactor reset into a function
 * Alter 1 circle to 6 (blossoming flower) & rotation as hold cue
 */

 var audioFiles = {
  shrinkSound: new Audio('assets/audio/exhaleBrit.mp3'),
  finishedSound: new Audio('assets/audio/finishedBrit_F.mp3'),
  expandHoldSound: new Audio('assets/audio/holdBrit.mp3'),
  expandSound: new Audio('assets/audio/inhaleBrit.mp3'),
  shrinkHoldSound: new Audio('assets/audio/holdBrit.mp3'),
  oneSound: new Audio('assets/audio/oneBrit.mp3'),
  twoSound: new Audio('assets/audio/twoBrit.mp3'),
  threeSound: new Audio('assets/audio/threeBrit.mp3'),
}

let audioLoaded = false;

document.body.addEventListener('touchstart', function() {
   if(!audioLoaded) {
     for(let audio of Object.values(audioFiles)) {
       audio.play()
       audio.pause()
       audio.currentTime = 0
     }
     audioLoaded = true
  }
});

let endTime = 0;
let timeouts = [];

let inhale = 0;
let inhaleHold = 0;
let exhale = 0;
let exhaleHold = 0;
let duration = 0;

let elapsedTime = 0;
let time = 0;

let endSessionEarly = false;

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
 elapsedTime = 0;
 //  Reset time in countdown
 time = 0;
 // Reset EndSessionEarly boolean
 endSessionEarly = false;

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
//  console.log(inhale, inhaleHold, exhale, exhaleHold, duration);

//  Reset timer
//  3 seconds added to time because of countdown animation
 endTime = new Date((new Date()).getTime() + (duration * 60 * 1000) + 3);

 const timeout = setTimeout(function() {
   callReady();
 }, 1000);
 timeouts.push(timeout);
}

function callReady() {
 let actionText = getActionText();
 actionText.innerHTML = "Ready";
 const timeout = setTimeout(function() {
   callSet();
 }, 1000);
 timeouts.push(timeout);
}

function callSet() {
 let actionText = getActionText();
 actionText.innerHTML = "Set";
 const timeout = setTimeout(function() {
   callGo();
 }, 1000);
 timeouts.push(timeout);
}

function callGo() {
 let actionText = getActionText();
 actionText.innerHTML = "Go!";
 updateCountdown();
 const timeout = setTimeout(function() {
   expand();
 }, 1000);
 timeouts.push(timeout);
}

function doCountdown(timeUtilNextEvent, callback) {
 timeout = setTimeout(function() {
   callback();
 }, timeUtilNextEvent * 1000);
 timeouts.push(timeout);

 // make three if statements for the situation of less than 4, 3, 2, or 1 second values
//  if (timeUtilNextEvent >= 4 && audioCountdownOn) {
//    timeout = setTimeout(function() {
//      // don't play if end session was clicked
//      if (!endSessionEarly) {
//      let threeSound  = audioFiles.threeSound;
//      threeSound.load();
//      threeSound.play();
//     //  console.log('I Said three!');
//      setTimeout(function() {
//        threeSound.pause();
//      }, 1000)
//     }
//    }, (timeUtilNextEvent - 3) * 1000);
//    timeouts.push(timeout);
//  }

 if (timeUtilNextEvent >= 3 && audioCountdownOn) {
   timeout = setTimeout(function() {
     // don't play if end session was clicked
     if (!endSessionEarly) {
      let twoSound  = audioFiles.twoSound;
      twoSound.load();
      twoSound.play();
      //  console.log('I Said two!');
      setTimeout(function() {
        twoSound.pause();
      }, 1000)
    }
   }, (timeUtilNextEvent - 2) * 1000);
   timeouts.push(timeout);
 }

 if (timeUtilNextEvent >= 2 && audioCountdownOn) {
   timeout = setTimeout(function() {
     if(!endSessionEarly) {
     const oneSound  = audioFiles.oneSound;
     oneSound.load();
     oneSound.play();
    //  console.log('I Said one!');
     setTimeout(function() {
       oneSound.pause();
     }, 1000)
    }
   }, (timeUtilNextEvent - 1) * 1000);
   timeouts.push(timeout);
 }
}

// function doVisualCountdown(timeUtilNextEvent, callback) {
//   timeout = setTimeout(function() {
//     callback();
//   }, timeUtilNextEvent * 1000);
//   timeouts.push(timeout);
 
//   // make 30 if statements for the situation of less than 1-30, 
//   if (timeUtilNextEvent >= 30 && visualCountdownOn) {
//     timeout = setTimeout(function() {
//       if (!endSessionEarly) {
//       let countText = getCountText();
//           countText.innerHTML = "30";
//      //  console.log('3o Seconds Left!');
//       setTimeout(function() {
//         countText.innerHTML = " ";
//       }, 1000)
//      }
//     }, (timeUtilNextEvent - 29) * 1000);
//     timeouts.push(timeout);
//   }
 
//   if (timeUtilNextEvent >= 3 && audioCountdownOn) {
//     timeout = setTimeout(function() {
//       // don't play if end session was clicked
//       if (!endSessionEarly) {
//        let twoSound  = audioFiles.twoSound;
//        twoSound.load();
//        twoSound.play();
//        //  console.log('I Said two!');
//        setTimeout(function() {
//          twoSound.pause();
//        }, 1000)
//      }
//     }, (timeUtilNextEvent - 2) * 1000);
//     timeouts.push(timeout);
//   }
//  }

function expand() {
 if (shouldEnd()) {
   shrink(true);
   return;
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
 // console.log("Expanding!");

 doCountdown(inhale, holdExpand);
}

function holdExpand() {
 if (shouldEnd()) {
   shrink(true);
   return;
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
 // console.log("Holding after expand!");

 doCountdown(inhaleHold, shrink);
}

function shrink(end) {
 if (inhaleHold > 0) {
   let circle = getCircle();
   circle.classList.remove("circle-pulse");
   circle.classList.remove("circlePurple");
 }

 let actionText = getActionText();
 actionText.innerHTML = "exhale";
 let circle = getCircle();
 circle.style.transition = "all " + exhale + "s linear";
 circle.classList.remove("circleLarge");
 // console.log("Shrinking!");

 if (end || shouldEnd()) {
   endAnimation();
   return;
 }

 playShrink();

 doCountdown(exhale, holdShrink);
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
 // console.log("Holding after shrink!");

 if (shouldEnd()) {
   shrink(true);
   return;
 }

 playShrinkHold();

 doCountdown(exhaleHold, expand);
}

function shouldEnd() {
 return ((new Date()) > endTime) || endSessionEarly;
}

function getCircle() {
 return document.getElementById('circle');
}

function getActionText() {
 return document.getElementById('actionText');
}

function playExpand() {
 const expandSound = audioFiles.expandSound;
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
 const expandHoldSound = audioFiles.expandHoldSound;
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
 const shrinkSound  = audioFiles.shrinkSound;
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
 const shrinkHoldSound = audioFiles.shrinkHoldSound;
 if(audioOn && exhaleHold > 0) {
   shrinkHoldSound.load();
   shrinkHoldSound.play();
   // console.log('I Said Exhale Hold!');
 }
 setTimeout(function() {
   shrinkHoldSound.pause();
 }, exhaleHold * 1000)
}

// end animation with audio
function endAnimation() {
 let endAnimationText = getEndAnimation();
 endAnimationText.innerHTML = "Finished!";
 endAnimationText.style.fontSize = "50px";
 const finishedSound = audioFiles.finishedSound;
 if(audioOn && inhaleHold > 0) {
   finishedSound.load();
   finishedSound.play();
 }
 endEarlyDetails();
}

function getEndAnimation() {
 return document.getElementById('actionText');
}

function endEarly() {
 let finishedAnimationText = getActionText();
 finishedAnimationText.innerHTML = finished;
}

function updateCountdown() {
 time = (duration * 60);
 const timeout = setInterval(function(){
   // get the element that will show the time
   const countdownEl = document.getElementById('countdown');
   const minutes = Math.floor(time /60);
   let seconds = time % 60;
   seconds = seconds < 10 ? '0' + seconds : seconds;
   countdownEl.innerHTML = `${minutes}:${seconds}`;
   time--;
  //  console.log(time);
   elapsedTime += 1;
   if(time <= 0) {
     clearInterval(time = 0)
   }
 }, 1000);
 timeouts.push(timeout);
}

// if button is set to true and used
function endEarlyButton() {
 endEarlyDetails();
}

function endEarlyDetails() {
 const endEarlyModal = document.getElementById('sessionDetailsModal');
 endEarlyModal.style.display = 'block';
 // get session duration completed
 sessionDurationCompleted = elapsedTime -1;
 // get element and insert time.
 const timeCompleted = document.getElementById('timeCompleted');
 timeCompleted.innerHTML = formatTime(sessionDurationCompleted);

 inhaleTimeChosen = parseInt(document.getElementById('chosenInhale').innerHTML);
 const inhaleTimeUsed = document.getElementById('inhaleTime');
 inhaleTimeUsed.innerHTML = `${inhaleTimeChosen}s inhale, `;

 inhaleHoldTimeChosen = parseInt(document.getElementById('chosenInhaleHold').innerHTML);
 const inhaleHoldTimeUsed = document.getElementById('inhaleHoldTime');
 inhaleHoldTimeUsed.innerHTML = `${inhaleHoldTimeChosen}s inhale hold, `;

 exhaleTimeChosen = parseInt(document.getElementById('chosenExhale').innerHTML);
 const exhaleTimeUsed = document.getElementById('exhaleTime');
 exhaleTimeUsed.innerHTML = `${exhaleTimeChosen}s exhale, `;

 exhaleHoldTimeChosen = parseInt(document.getElementById('chosenExhaleHold').innerHTML);
 const exhaleHoldTimeUsed = document.getElementById('exhaleHoldTime');
 exhaleHoldTimeUsed.innerHTML = `and ${exhaleHoldTimeChosen}s exhale hold!`;

 // update end session early boolean
 endSessionEarly = !endSessionEarly;
 // stop timer if finished selected
 time = 0;
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