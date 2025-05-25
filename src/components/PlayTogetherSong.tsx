"use client";

import React, { useEffect, useRef, useState } from "react";
import {
	FilesetResolver,
	GestureRecognizer,
	GestureRecognizerResult,
} from "@mediapipe/tasks-vision";
import { motion } from "framer-motion";
import "react-piano/dist/styles.css";
import Image from "next/image";
import { select } from "motion/react-client";
import Camera from "./Camera";
import { SimplifiedGestures } from "@/utils/gestures";

export default function PlayTogetherSong({ selectedSong, gameScore }) {
	const [score, setScore] = useState(0);
	const videoRef = useRef<HTMLVideoElement>(null);
	const [gestureRecognizer, setGestureRecognizer] =
		useState<GestureRecognizer | null>(null);
	const [gestures, setGestures] = useState<SimplifiedGestures | null>(null);

	const handleGestures = (gestureResult: SimplifiedGestures | null) => {
		if (!gestureResult) return;

		setGestures(gestureResult);

		// Do something with the new gestures here
		console.log("Gestures detected:", gestureResult);
	};

	const playBacktrack = () => {
		const audio = null;
		switch (selectedSong) {
			case "Love Story":
				const audio = new Audio("/audio/love-story-notes.mp3");
				audio.onended = () => {
					gameScore(score);
				};
				audio.play();
		}
	};

	useEffect(() => {
		playBacktrack();
	}, [selectedSong]);

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
			className='flex flex-col items-center m-auto'
		>
			<h1 className='text-md my-4'>Playing: {selectedSong}</h1>
			<div className='flex flex-3'>
				<div className='h-[480px] w-[200px] border border-white/20 bg-white bg-opacity-10 py-8 px-4 rounded-xl mx-4 text-md text-opacity-75'>
					<h2 className='text-lg font-semibold mb-2'>Player 1</h2>
					{gestures ? (
						<div className='mb-1 text-5xl'>
							<strong>{gestures["left"]}</strong>
						</div>
					) : (
						<p>No Gestures Detected</p>
					)}
					<div className='h-[250px] w-[150px]'>
						<Image
							src='/images/p1_idle.gif'
							alt='my gif'
							height={500}
							width={500}
							className='object-cover min-h-[250px] min-w-[160px]'
							unoptimized
						/>
					</div>
				</div>
				<Camera onGesturesDetected={handleGestures} />
				<div className='h-[480px] w-[200px] border border-white/20 bg-white bg-opacity-10 py-8 px-4 rounded-xl mx-4 text-md text-opacity-75 text-right'>
					<h2 className='text-lg font-semibold mb-2'>Player 2</h2>
					{gestures ? (
						<div className='mb-1 text-5xl'>
							<strong>{gestures["right"]}</strong>
						</div>
					) : (
						<p>No Gestures Detected</p>
					)}
					<div className='relative bottom-0 h-[200px]'>
						<Image
							src='/images/p2_idle.gif'
							alt='my gif'
							height={500}
							width={500}
							unoptimized
						/>
					</div>
				</div>
			</div>
			<h1 className='w-[200px] mx-auto text-center pt-4 text-white'>
				Make the gesture!
			</h1>
			<div className='mt-4 p-4 w-[1200px] h-[150px] text-white rounded-xl justify center flex'>
				<div className='w-1/2 border-b-4 border-b-white border-r'>
					<div className='w-1/4 border-b-8 border-b-green-500 float-right h-[120px]'></div>
				</div>
				<div className='w-1/2 border-b-4 border-b-white border-l'>
					<div className='w-1/4 border-b-8 border-b-green-500 h-[120px]'></div>
				</div>
			</div>
		</motion.div>
	);
}
