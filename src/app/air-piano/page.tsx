"use client";

import React, { useEffect, useRef, useState } from "react";
import {
	FilesetResolver,
	GestureRecognizer,
	GestureRecognizerResult,
} from "@mediapipe/tasks-vision";

export default function AirPiano() {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [gestureRecognizer, setGestureRecognizer] =
		useState<GestureRecognizer | null>(null);
	const [gestureResult, setGestureResult] =
		useState<GestureRecognizerResult | null>(null);

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
							"https://storage.googleapis.com/mediapipe-tasks/gesture_recognizer/gesture_recognizer.task",
					},
					numHands: 2,
				}
			);

			await recognizer.setOptions({ runningMode: "VIDEO" });

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
					setGestureResult(result);
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

	return (
		<div className='flex flex-col items-center p-4'>
			<video
				id='video'
				ref={videoRef}
				className='w-[640px] h-[480px] rounded-lg border border-gray-300'
				muted
				playsInline
			/>
			<div className='mt-4 p-4 w-[640px] bg-gray-800 text-white rounded-lg'>
				<h2 className='text-xl font-semibold mb-2'>
					Detected Gestures:
				</h2>
				{gestureResult?.gestures.length ? (
					gestureResult.gestures[0].map((g) => (
						<div key={g.categoryName} className='mb-1'>
							<strong>{g.categoryName}</strong> - Confidence:{" "}
							{(g.score * 100).toFixed(1)}%
						</div>
					))
				) : (
					<p>No gestures detected.</p>
				)}
			</div>
		</div>
	);
}
