let navOpen = false;

function toggleNav() {
    navOpen = !navOpen;
    if(navOpen){
        let navDiv = document.getElementById("collapsableNav");
        navDiv.classList.add("hidden");
    } else {
        let navDiv = document.getElementById("collapsableNav");
        navDiv.classList.remove("hidden");
    }   
}

let audioOn = false;

function toggleAudio() {
    audioOn = !audioOn;
}

let audioCountdownOn = false;

function toggleAudioCountdown() {
    audioCountdownOn = !audioCountdownOn;
}

let colorOn = false;

function toggleColor() {
    colorOn = !colorOn;
}

let pulseOn = false;

function togglePulse() {
    pulseOn = !pulseOn;
}

let countdownOn = false;

function toggleCountdown() {
    countdownOn = !countdownOn;
    if(countdownOn){
        const countdownDiv = document.getElementById("countdownDiv");
        countdownDiv.style.display = "block";
    } else {
        countdownDiv.style.display = "none";
    }
}

let endEarlyButtonOn = false;

function toggleEndEarlyButton() {
    endEarlyButtonOn = !endEarlyButtonOn;
    if(endEarlyButtonOn){
        const endEarlyDiv = document.getElementById("endSessionEarly");
        endEarlyDiv.style.display = "block";
    } else {
        const endEarlyDiv = document.getElementById("endSessionEarly");
        endEarlyDiv.style.display = "none";
    }
}