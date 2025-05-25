"use client";

import React, { useEffect, useRef, useState } from "react";
import {
	FilesetResolver,
	GestureRecognizer,
	GestureRecognizerResult,
} from "@mediapipe/tasks-vision";
import { motion } from 'framer-motion';
import "react-piano/dist/styles.css";

export default function PlayTogetherSong({selectedSong}) {
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
							// "https://storage.googleapis.com/mediapipe-tasks/gesture_recognizer/gesture_recognizer.task",
							"./asl_gesture_recognizer.task",
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
					console.log(result.gestures.length);
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
		<motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                 className='flex flex-col items-center m-auto'>
                  <h1 className="text-md my-4">Playing: {selectedSong}</h1>
			<div className='flex flex-3'>
				<div className='h-[480px] w-[200px] border border-white/20 bg-white bg-opacity-10 py-8 px-4 rounded-xl mx-4 text-md text-opacity-75'>
					<h2 className='text-lg font-semibold mb-2'>
						Player 1
					</h2>
					{gestureResult?.gestures.length ? (
						gestureResult.gestures[0].map((g) => (
							<div key={g.categoryName} className='mb-1'>
								<strong>{g.categoryName}</strong> - Confidence:{" "}
								{(g.score * 100).toFixed(1)}%
							</div>
						))
					) : (
						<p>No Gestures Detected</p>
					)}
				</div>
				<video
					id='video'
					ref={videoRef}
					className='w-[640px] h-[480px] rounded-lg border border-gray-300 scale-x-[-1]'
					muted
					playsInline
				/>
				<div className='h-[480px] w-[200px] border border-white/20 bg-white bg-opacity-10 py-8 px-4 rounded-xl mx-4 text-md text-opacity-75'>
					<h2 className='text-lg font-semibold mb-2'>
						Player 2
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
		</motion.div>
	);
}
