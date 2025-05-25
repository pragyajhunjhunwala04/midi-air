import * as Tone from 'tone';

// Initialize audio context
let audioStarted = false;
async function startAudio() {
    if (!audioStarted) {
        await Tone.start();
        audioStarted = true;
        document.getElementById('status').textContent = 'Audio ready! Use your keyboard to play notes!';
    }
}

//piano functions
function playC4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C4", "4n");
}
function playDb4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("Db4", "4n");
}
function playD4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("D4", "4n");
}
function playEb4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("Eb4", "4n");
}
function playE4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("E4", "4n");
}
function playF4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("F4", "4n");
}
function playGb4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("Gb4", "4n");
}
function playG4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("G4", "4n");
}
function playAb4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("Ab4", "4n");
}
function playA4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("A4", "4n");
}
function playBb4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("Bb4", "4n");
}
function playB4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("B4", "4n");
}
function playC5() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C5", "4n");
}

function playNote(event) {
    if (event.keyCode === 65) playC4();
    if (event.keyCode === 87) playDb4();
    if (event.keyCode === 83) playD4();
    if (event.keyCode === 69) playEb4();
    if (event.keyCode === 68) playE4();
    if (event.keyCode === 70) playF4();
    if (event.keyCode === 84) playGb4();
    if (event.keyCode === 71) playG4();
    if (event.keyCode === 89) playAb4();
    if (event.keyCode === 72) playA4();
    if (event.keyCode === 85) playBb4();
    if (event.keyCode === 74) playB4();
    if (event.keyCode === 75) playC5();
}

// Make functions available globally for buttons
window.playC4 = playC4;
window.playDb4 = playDb4;
window.playD4 = playD4;
window.playEb4 = playEb4;
window.playE4 = playE4;
window.playF4 = playF4;
window.playGb4 = playGb4;
window.playG4 = playG4;
window.playAb4 = playAb4;
window.playA4 = playA4;
window.playBb4 = playBb4;
window.playB4 = playB4;
window.playC5 = playC5;

// Set up keyboard listener
document.addEventListener('keydown', async (event) => {
    await startAudio();
    playNote(event);
});

// Set up click listener to start audio
document.addEventListener('click', startAudio);