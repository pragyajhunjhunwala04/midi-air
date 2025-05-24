// Piano Player using Tone.js
// Make sure to include Tone.js in your HTML: <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js"></script>

class PianoPlayer {
    constructor() {
        // Create a polyphonic synth that sounds more like a piano
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

        // Add some reverb for a richer sound
        this.reverb = new Tone.Reverb({
            decay: 1.5,
            preDelay: 0.01
        }).toDestination();
        
        this.synth.connect(this.reverb);

        // Audio context needs to be started by user interaction
        this.isStarted = false;
    }

    // Start the audio context (required by browsers)
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

// Create global piano player instance
const piano = new PianoPlayer();

// Utility functions for easy access
window.playNote = (note, duration) => piano.playNote(note, duration);

// Example usage functions
window.examples = {
    //single notes
    playC: () => piano.playNote('C4'),
    playD: () => piano.playNote('D4'),
    playE: () => piano.playNote('E4'),
    playF: () => piano.playNote('F4'),
    playG: () => piano.playNote('G4'),
    playA: () => piano.playNote('A4'),
    playB: () => piano.playNote('B4'),
    
};

// Console instructions
console.log(`
🎹 Piano Player Ready!

Basic Usage:
• playNote('C4') - Play single note
• playChord(['C4', 'E4', 'G4']) - Play chord
• playSequence(['C4', 'D4', 'E4']) - Play sequence
• playScale('C4', 'major') - Play scale

Quick Examples:
• examples.playC() - Play C note
• examples.playCMajor() - Play C major chord  
• examples.playTwinkle() - Play Twinkle Twinkle Little Star
• examples.playScale() - Play C major scale

Note Format: 
• Use standard notation: C4, D#4, Bb3, etc.
• Numbers represent octaves (4 is middle octave)
`);

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PianoPlayer, piano };
}