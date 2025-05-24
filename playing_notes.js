// Piano Player using Tone.js
// Make sure to include Tone.js in your HTML: <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js"></script>

class PianoPlayer {
    constructor() {
        this.synth = new Tone.PolySynth(Tone.Synth, {
            oscillator: {
                type: "triangle"
            },
            envelope: {
                attack: 0.02,
                decay: 0.1,
                sustain: 0.3,
                release: 1
            }
        }).toDestination();
        this.reverb = new Tone.Reverb({
            decay: 1.5,
            preDelay: 0.01
        }).toDestination();
        
        this.synth.connect(this.reverb);
        this.isStarted = false;
    }

    // Start the audio context - required by browsers
    async startAudio() {
        if (!this.isStarted) {
            await Tone.start();
            this.isStarted = true;
            console.log('Audio context started');
        }
    }

    // Play a single note
    async playNote(note, duration = '8n') {
        await this.startAudio();
        this.synth.triggerAttackRelease(note, duration);
        console.log(`Playing note: ${note}`);
    }
}

const piano = new PianoPlayer();
window.playNote = (note, duration) => piano.playNote(note, duration);

// Example usage functions
window.examples = {
    playC: () => piano.playNote('C4'),
    playD: () => piano.playNote('D4'),
    playE: () => piano.playNote('E4'),
    playF: () => piano.playNote('F4'),
    playG: () => piano.playNote('G4'),
    playA: () => piano.playNote('A4'),
    playB: () => piano.playNote('B4'),
    
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PianoPlayer, piano };
}