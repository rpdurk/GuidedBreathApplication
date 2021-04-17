// inhale slider value
var inHaleSlider = document.getElementById('inhaleValue');
var inhaleOutput = document.getElementById('chosenInhale');
inhaleOutput.innerHTML = inHaleSlider.value;

inHaleSlider.oninput = function() {
  inhaleOutput.innerHTML = this.value;
}

// inhale-Hold slider value
var inHaleHoldSlider = document.getElementById('inhaleHoldValue');
var inhaleHoldOutput = document.getElementById('chosenInhaleHold');
inhaleHoldOutput.innerHTML = inHaleHoldSlider.value;

inHaleHoldSlider.oninput = function() {
  inhaleHoldOutput.innerHTML = this.value;
}

// exhale slider value
var exhaleSlider = document.getElementById('exhaleValue');
var exhaleOutput = document.getElementById('chosenExhale');
exhaleOutput.innerHTML = exhaleSlider.value;

exhaleSlider.oninput = function() {
  exhaleOutput.innerHTML = this.value;
}

// exhale-hold slider value
var exhaleHoldSlider = document.getElementById('exhaleHoldValue');
var exhaleHoldOutput = document.getElementById('chosenExhaleHold');
exhaleHoldOutput.innerHTML = exhaleHoldSlider.value;

exhaleHoldSlider.oninput = function() {
  exhaleHoldOutput.innerHTML = this.value;
}

// duration slider value
var durationSlider = document.getElementById('durationValue');
var durationOutput = document.getElementById('chosenDuration');
durationOutput.innerHTML = durationSlider.value;

durationSlider.oninput = function() {
  durationOutput.innerHTML = this.value;
}