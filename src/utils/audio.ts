// utils/audio.ts
import * as Tone from "tone";
import { SimplifiedGestures } from "./gestures";

let audioStarted = false;

export async function startAudio() {
	if (!audioStarted) {
		await Tone.start();
		audioStarted = true;
		console.log("Audio context started");
	}
}

export function playNote(note: string, duration: string = "4n") {
	const synth = new Tone.Synth().toDestination();
	synth.triggerAttackRelease(note, duration);
}

const gestureToOctave: any = {
	A: "0",
	B: "1",
	C: "2",
	D: "3",
	E: "4",
	F: "5",
	G: "6",
};

export function getNoteFromGestures(
	gestureResult: SimplifiedGestures
): string | null {
	if (!gestureResult || !gestureResult.left || !gestureResult.right) {
		return null;
	}

	const leftGesture = gestureResult.left;
	const rightGesture = gestureResult.right;

	const octave = gestureToOctave[rightGesture];

	if (!leftGesture || !octave) {
		return null;
	}
	return `${leftGesture}${octave}`;
}
