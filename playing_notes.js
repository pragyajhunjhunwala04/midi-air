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

// Piano functions - Natural notes only (A-G) across octaves 0-7
function playCa() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("C0", "4n"); }
function playDa() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("D0", "4n"); }
function playEa() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("E0", "4n"); }
function playFa() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("F0", "4n"); }
function playGa() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("G0", "4n"); }
function playAa() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("A0", "4n"); }
function playBa() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("B0", "4n"); }

function playCb() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("C1", "4n"); }
function playDb() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("D1", "4n"); }
function playEb() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("E1", "4n"); }
function playFb() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("F1", "4n"); }
function playGb() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("G1", "4n"); }
function playAb() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("A1", "4n"); }
function playBb() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("B1", "4n"); }

function playCc() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("C2", "4n"); }
function playDc() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("D2", "4n"); }
function playEc() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("E2", "4n"); }
function playFc() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("F2", "4n"); }
function playGc() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("G2", "4n"); }
function playAc() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("A2", "4n"); }
function playBc() {const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("B2", "4n"); }

function playCd() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("C3", "4n"); }
function playDd() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("D3", "4n"); }
function playEd() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("E3", "4n"); }
function playFd() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("F3", "4n"); }
function playGd() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("G3", "4n"); }
function playAd() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("A3", "4n"); }
function playBd() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("B3", "4n"); }

function playCe() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("C4", "4n"); }
function playDe() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("D4", "4n"); }
function playEe() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("E4", "4n"); }
function playFe() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("F4", "4n"); }
function playGe() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("G4", "4n"); }
function playAe() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("A4", "4n"); }
function playBe() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("B4", "4n"); }

function playCf() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("C5", "4n"); }
function playDf() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("D5", "4n"); }
function playEf() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("E5", "4n"); }
function playFf() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("F5", "4n"); }
function playGf() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("G5", "4n"); }
function playAf() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("A5", "4n"); }
function playBf() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("B5", "4n"); }

function playCg() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("C6", "4n"); }
function playDg() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("D6", "4n"); }
function playEg() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("E6", "4n"); }
function playFg() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("F6", "4n"); }
function playGg() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("G6", "4n"); }
function playAg() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("A6", "4n"); }
function playBg() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("B6", "4n"); }

// Commented out octave 7 functions
// function playC7() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("C7", "4n"); }
// function playD7() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("D7", "4n"); }
// function playE7() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("E7", "4n"); }
// function playF7() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("F7", "4n"); }
// function playG7() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("G7", "4n"); }
// function playA7() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("A7", "4n"); }
// function playB7() { const synth = new Tone.Synth().toDestination(); synth.triggerAttackRelease("B7", "4n"); }

// Make all functions available globally 
window.playCa = playCa; window.playDa = playDa; window.playEa = playEa; window.playFa = playFa; window.playGa = playGa; window.playAa = playAa; window.playBa = playBa;
window.playCb = playCb; window.playDb = playDb; window.playEb = playEb; window.playFb = playFb; window.playGb = playGb; window.playAb = playAb; window.playBb = playBb;
window.playCc = playCc; window.playDc = playDc; window.playEc = playEc; window.playFc = playFc; window.playGc = playGc; window.playAc = playAc; window.playBc = playBc;
window.playCd = playCd; window.playDd = playDd; window.playEd = playEd; window.playFd = playFd; window.playGd = playGd; window.playAd = playAd; window.playBd = playBd;
window.playCe = playCe; window.playDe = playDe; window.playEe = playEe; window.playFe = playFe; window.playGe = playGe; window.playAe = playAe; window.playBe = playBe;
window.playCf = playCf; window.playDf = playDf; window.playEf = playEf; window.playFf = playFf; window.playGf = playGf; window.playAf = playAf; window.playBf = playBf;
window.playCg = playCg; window.playDg = playDg; window.playEg = playEg; window.playFg = playFg; window.playGg = playGg; window.playAg = playAg; window.playBg = playBg;
//window.playC7 = playC7; window.playD7 = playD7; window.playE7 = playE7; window.playF7 = playF7; window.playG7 = playG7; window.playA7 = playA7; window.playB7 = playB7;

// Audio context initialization only
document.addEventListener('click', startAudio);