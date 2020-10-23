var button = document.getElementById('speak');

// Get the text input element.
var speechMsgInput = document.getElementById('speech-msg');

// Get the voice select element.
var voiceSelect = document.getElementById('voice');

// Get the attribute controls.
var volumeInput = document.getElementById('volume');
var rateInput = document.getElementById('rate');
var pitchInput = document.getElementById('pitch');


// Fetch the list of voices and populate the voice options.
function loadVoices() {
  // Fetch the available voices.
	var voices = speechSynthesis.getVoices();
  
  // Loop through each of the voices.
	voices.forEach(function(voice, i) {
    //console.log(voice.name);
    //console.log((voice));
    
	});
}

// Execute loadVoices.
loadVoices();

// Chrome loads voices asynchronously.
window.speechSynthesis.onvoiceschanged = function(e) {
  loadVoices();
};
