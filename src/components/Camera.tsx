import { SimplifiedGestures, simplifyGestures } from "@/utils/gestures";
import { FilesetResolver, GestureRecognizer } from "@mediapipe/tasks-vision";
import React, { useEffect, useRef, useState } from "react";

type Props = {
	onGesturesDetected: (gestures: SimplifiedGestures) => void;
};

const Camera = ({ onGesturesDetected }: Props) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [gestureRecognizer, setGestureRecognizer] =
		useState<GestureRecognizer | null>(null);
	const [gestureResult, setGestureResult] =
		useState<SimplifiedGestures | null>(null);

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
		onGesturesDetected(gestureResult);
	}, [gestureResult]);

	return (
		<video
			id='video'
			ref={videoRef}
			className='w-[640px] h-[480px] rounded-lg border border-gray-300 scale-x-[-1]'
			muted
			playsInline
		/>
	);
};

export default Camera;
