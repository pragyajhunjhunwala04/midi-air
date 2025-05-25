"use client";

import React, { useEffect, useRef, useState } from "react";
import {
	FilesetResolver,
	GestureRecognizer,
	GestureRecognizerResult,
} from "@mediapipe/tasks-vision";

import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import { getNoteFromGestures, playNote } from "@/utils/audio";
import { SimplifiedGestures, simplifyGestures } from "@/utils/gestures";

export default function AirPiano() {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [gestureRecognizer, setGestureRecognizer] =
		useState<GestureRecognizer | null>(null);
	const [gestureResult, setGestureResult] =
		useState<SimplifiedGestures | null>(null);
	const previousNoteRef = useRef<string>("");
	const noteBufferRef = useRef<string[]>([]);
	const STABILITY_THRESHOLD = 3; // how many consistent frames needed

	const firstNote = MidiNumbers.fromNote("c0"); // MIDI number for C3
	const lastNote = MidiNumbers.fromNote("b6"); // MIDI number for F5

	useEffect(() => {
		let animationFrameId: number;
		let lastVideoTime = -1;
		let running = true;

		async function setupGestureRecognizer() {
			// Create task for image file processing:
			const vision = await FilesetResolver.forVisionTasks(
				// path/to/wasm/root
				"https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
			);
			const recognizer = await GestureRecognizer.createFromOptions(
				vision,
				{
					baseOptions: {
						modelAssetPath:
							// "https://storage.googleapis.com/mediapipe-tasks/gesture_recognizer/gesture_recognizer.task",`
							"./asl_gesture_recognizer.task",
					},
				}
			);

			await recognizer.setOptions({ runningMode: "VIDEO", numHands: 2 });

			setGestureRecognizer(recognizer);

			// Start webcam
			if (videoRef.current) {
				const stream = await navigator.mediaDevices.getUserMedia({
					video: true,
				});
				videoRef.current.srcObject = stream;
				await videoRef.current.play();
			}

			// Render loop for gesture detection
			function renderLoop() {
				if (!videoRef.current || !recognizer || !running) return;
				if (videoRef.current.currentTime !== lastVideoTime) {
					const result = recognizer.recognizeForVideo(
						videoRef.current,
						videoRef.current.currentTime
					);
					// console.log(result);
					const simplified = simplifyGestures(result);
					setGestureResult(simplified);
					lastVideoTime = videoRef.current.currentTime;
				}
				animationFrameId = requestAnimationFrame(renderLoop);
			}

			renderLoop();
		}

		setupGestureRecognizer();

		return () => {
			running = false;
			if (gestureRecognizer) {
				gestureRecognizer.close();
			}
			if (videoRef.current?.srcObject) {
				(videoRef.current.srcObject as MediaStream)
					.getTracks()
					.forEach((track) => track.stop());
			}
			cancelAnimationFrame(animationFrameId);
		};
	}, []);

	useEffect(() => {
		if (!gestureResult) return;

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
	}, [gestureResult]);

	return (
		<div className='flex flex-col items-center m-auto'>
			<div className='flex flex-3'>
				<div className='h-[480px] w-[200px] border border-white/20 bg-white bg-opacity-10 py-8 px-4 rounded-xl mx-4 text-md text-opacity-75'></div>
				<video
					id='video'
					ref={videoRef}
					className='w-[640px] h-[480px] rounded-lg border border-gray-300 scale-x-[-1]'
					muted
					playsInline
				/>
				<div className='h-[480px] w-[200px] border border-white/20 bg-white bg-opacity-10 py-8 px-4 rounded-xl mx-4 text-md text-opacity-75'>
					<h2 className='text-lg font-semibold mb-2'>
						Detected Gestures:
					</h2>
					{gestureResult ? (
						<>
							<div className='mb-3'>
								<div className='font-semibold mb-1'>
									Left Hand:
								</div>
								<div className='mb-1 ml-2'>
									<strong>{gestureResult["left"]}</strong>
								</div>
							</div>
							<div className='mb-3'>
								<div className='font-semibold mb-1'>
									Right Hand:
								</div>
								<div className='mb-1 ml-2'>
									<strong>{gestureResult["right"]}</strong>
								</div>
							</div>
						</>
					) : (
						<p>No gestures detected</p>
					)}
				</div>
			</div>
			<div className='mt-4 p-4 w-[1200px] text-white rounded-xl justify center'>
				<Piano
					noteRange={{ first: firstNote, last: lastNote }}
					// playNote={playNote}
					stopNote={() => {}}
					width={1100}
					className='ml-8'
				/>
			</div>
		</div>
	);
}
