let audioOn = false;

function toggleAudio() {
    audioOn = !audioOn;
    // console.log(audioOn);
}

let colorOn = false;

function toggleColor() {
    colorOn = !colorOn;
    // console.log(colorOn);
}

let pulseOn = false;

function togglePulse() {
    pulseOn = !pulseOn;
    // console.log(pulseOn);
}

let countdownOn = false;

function toggleCountdown() {
    countdownOn = !countdownOn;
    if(!countdownOn){
        const countdownDiv = document.getElementById("countdownDiv");
        countdownDiv.style.display = "block";
    } else {
        countdownDiv.style.display = "none";
    }
    // console.log(countdownOn);
}