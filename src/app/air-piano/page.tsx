"use client";

import React, { useRef, useState } from "react";

import "react-piano/dist/styles.css";
import { getNoteFromGestures, playNote } from "@/utils/audio";
import { SimplifiedGestures } from "@/utils/gestures";
import Camera from "@/components/Camera";

export default function AirPiano() {
	const [gestures, setGestures] = useState<SimplifiedGestures | null>(null);
	const previousNoteRef = useRef<string>("");
	const noteBufferRef = useRef<string[]>([]);

	const STABILITY_THRESHOLD = 3; // how many consistent frames needed

	const handleGestures = (gestureResult: SimplifiedGestures | null) => {
		if (!gestureResult) return;

		setGestures(gestureResult);

		const currentNote = getNoteFromGestures(gestureResult);
		const buffer = noteBufferRef.current;

		if (!currentNote) {
			// No valid gesture so clear the buffer
			buffer.length = 0;
			return;
		}

		// Add the current note to the buffer
		buffer.push(currentNote);

		// Keep only the last N entries
		if (buffer.length > STABILITY_THRESHOLD) {
			buffer.shift();
		}

		// Check if the last N notes are all the same
		const allSame =
			buffer.length === STABILITY_THRESHOLD &&
			buffer.every((note) => note === buffer[0]);

		if (allSame && buffer[0] !== previousNoteRef.current) {
			console.log("Playing note:", buffer[0]);
			playNote(buffer[0]);
			previousNoteRef.current = buffer[0];
		}
	};

	return (
		<div className='flex flex-col items-center justify-center'>
			<div className='flex flex-3'>
				<div className='h-[480px] w-[200px] border border-white/20 bg-white bg-opacity-10 py-8 px-4 rounded-xl mx-4 text-md text-opacity-75'>
				<h2 className='text-lg font-semibold mb-2'>
						Left Hand
					</h2>
				{gestures ? (
						<>
							<div className='mb-3'>
								<div className='mb-1 ml-2'>
									<strong>{gestures["left"]}</strong>
								</div>
							</div>
						</>
					) : (
						<p>No gestures detected</p>
					)}
				</div>
				<Camera onGesturesDetected={handleGestures} />
				<div className='h-[480px] w-[200px] border border-white/20 bg-white bg-opacity-10 py-8 px-4 rounded-xl mx-4 text-md text-opacity-75'>
					<h2 className='text-lg font-semibold mb-2'>
						Right Hand
					</h2>
					{gestures ? (
						<>
							<div className='mb-3'>
								<div className='mb-1 ml-2'>
									<strong>{gestures["right"]}</strong>
								</div>
							</div>
						</>
					) : (
						<p>No gestures detected</p>
					)}
				</div>
			</div>
		</div>
	);
}
