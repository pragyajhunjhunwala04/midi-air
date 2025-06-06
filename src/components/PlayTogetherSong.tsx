"use client";

import React, { JSX, useEffect, useRef, useState } from "react";
import { GestureRecognizer } from "@mediapipe/tasks-vision";
import { motion } from "framer-motion";
import "react-piano/dist/styles.css";
import Image from "next/image";
import Camera from "./Camera";
import { SimplifiedGestures } from "@/utils/gestures";
import { loveSong, telepatia, pink, fireworks } from "../data/songSequences";
import { getNoteFromGestures, playNote } from "@/utils/audio";

type Props = {
	selectedSong: string;
	gameScore: (score: number) => void;
};

export default function PlayTogetherSong({ selectedSong, gameScore }: Props) {
	const [score, setScore] = useState(0);
	useState<GestureRecognizer | null>(null);
	const [gestures, setGestures] = useState<SimplifiedGestures | null>(null);
	const song = loveSong;

	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [leftElement, setLeftElement] = useState<JSX.Element[]>([]);
	const [rightElement, setRightElement] = useState<JSX.Element[]>([]);
	const [count, setCount] = useState(0);

	const [timeInterval, setTimeInterval] = useState(1);
	const [leftGestures, setLeftGestures] = useState<string[]>([]);
	const [rightGestures, setRightGestures] = useState<string[]>([]);
	const [p1_sprite, set_p1_sprite] = useState("/images/p1_idle.gif");
	const [p2_sprite, set_p2_sprite] = useState("/images/p2_idle.gif");

	const gesturesRef = useRef<SimplifiedGestures | null>(null);
	const scoreRef = useRef(score);

	const handleGestures = (gestureResult: SimplifiedGestures | null) => {
		if (!gestureResult) return;

		setGestures(gestureResult);

		// Do something with the new gestures here
		// console.log("Gestures detected:", gestureResult);
	};

	// Update the ref when gestures change
	useEffect(() => {
		gesturesRef.current = gestures;
	}, [gestures]);

	const noteToGesture: { [key: string]: string } = {
		A: "/images/a.svg",
		B: "/images/b.svg",
		C: "/images/c.svg",
		D: "/images/d.svg",
		E: "/images/e.svg",
		F: "/images/f.svg",
		G: "/images/d.svg",
		X: "",
	};

	useEffect(() => {
		let audio = null;
		switch (selectedSong) {
			case "Love Story":
				audio = new Audio("/audio/love-story-notes.mp3");
				setTimeInterval(2);
				setLeftGestures(loveSong.leftSequence);
				setRightGestures(loveSong.rightSequence);
				audio.play();
				break;
			case "telepatia":
				audio = new Audio("/audio/telepatia-notes.mp3");
				setTimeInterval(1.5);
				setLeftGestures(telepatia.leftSequence);
				setRightGestures(telepatia.rightSequence);
				audio.play();
				break;
      case 'Pink Pony Club':
        audio = new Audio('/audio/pink-pony-club-notes.mp3');
        setTimeInterval(1.8);
        setLeftGestures(pink.leftSequence);
        setRightGestures(pink.rightSequence);
        audio.play();
        break;
      case 'Firework':
        audio = new Audio('/audio/firework-notes.mp3');
        setTimeInterval(2.3);
        setLeftGestures(fireworks.leftSequence);
        setRightGestures(fireworks.rightSequence);
        audio.play();
        break;
		}
		audioRef.current = audio;
		if (!audio) return;
		audio.onended = () => {
			gameScore(scoreRef.current);
		};

		return () => {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current.currentTime = 0;
			}
		};
	}, [selectedSong]);

	useEffect(() => {
		const gameInterval = setInterval(() => {
			setCount((prevCount) => {
				const newCount = prevCount + 1;
				const currentGestures = gesturesRef.current;

				if (
					currentGestures &&
					currentGestures.left &&
					currentGestures.right
				) {
					// Check correctness
					const p1_score =
						currentGestures.left === leftGestures[newCount];
					const p2_score =
						currentGestures.right === rightGestures[newCount];

					// console.log(currentGestures.left, leftGestures[newCount]);
					if (p1_score) {
						set_p1_sprite("/images/p1_good.gif");
						setTimeout(
							() => set_p1_sprite("/images/p1_idle.gif"),
							750
						);
					}
					if (p2_score) {
						set_p2_sprite("/images/p2_good.gif");
						setTimeout(
							() => set_p2_sprite("/images/p2_idle.gif"),
							750
						);
					}
					if (p1_score && p2_score) {
						const note = getNoteFromGestures(currentGestures);
						console.log("Gestures:", currentGestures);
						if (note) {
							console.log("playing");
							playNote(note);
						}
						setScore((prev) => {
							scoreRef.current = prev + 1; // update ref too
							return scoreRef.current;
						});
					}
				}

				if (newCount < leftGestures.length) {
					if (leftGestures[newCount] != "X") {
						setLeftElement([
							<motion.div
								initial={{ opacity: 0.5 }}
								animate={{ opacity: 1, x: 500 }}
								transition={{ duration: timeInterval }}
								className='absolute top-0 left-0'
								key={newCount}
							>
								<Image
									src={noteToGesture[leftGestures[newCount]]}
									alt='ASL Gesture'
									height={100}
									width={100}
									className='object-fit max-h-[120px] p-4'
								/>
							</motion.div>,
						]);
					}
					if (rightGestures[newCount] != "X") {
						setRightElement([
							<motion.div
								initial={{ opacity: 0.5 }}
								animate={{ opacity: 1, x: -500 }}
								transition={{ duration: timeInterval }}
								className='absolute top-0 right-0'
								key={newCount}
							>
								<Image
									src={noteToGesture[rightGestures[newCount]]}
									alt='ASL Gesture'
									height={100}
									width={100}
									className='object-fit max-h-[120px] p-4'
								/>
							</motion.div>,
						]);
					}
				}
				return newCount;
			});
		}, timeInterval * 1000);

		return () => clearInterval(gameInterval);
	}, [timeInterval]);

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
			className='flex flex-col items-center m-auto'
		>
			<h1 className='text-md my-4'>Playing: {selectedSong}</h1>
			<div className='flex flex-3'>
				<div className='h-[480px] w-[200px] border border-white/20 bg-white bg-opacity-10 py-8 px-4 rounded-xl mx-4 text-md text-opacity-75 flex flex-col justify-between'>
					<div>
						<h2 className='text-lg font-semibold mb-2'>Player 1</h2>
						{gestures ? (
							<div className='mb-1 text-5xl'>
								<strong>{gestures["left"]}</strong>
							</div>
						) : (
							<p>No Gestures Detected</p>
						)}
					</div>

					<div className='w-full relative overflow-hidden flex-1 flex items-end justify-center'>
						<Image
							src={p1_sprite}
							alt='my gif'
							height={250}
							width={150}
							className='object-cover h-[210px]'
							unoptimized
						/>
					</div>
				</div>
				<Camera onGesturesDetected={handleGestures} />
				<div className='h-[480px] w-[200px] border border-white/20 bg-white bg-opacity-10 py-8 px-4 rounded-xl mx-4 text-md text-opacity-75 flex flex-col justify-between'>
					<div>
						<h2 className='text-lg font-semibold mb-2'>Player 2</h2>
						{gestures ? (
							<div className='mb-1 text-5xl'>
								<strong>{gestures["right"]}</strong>
							</div>
						) : (
							<p>No Gestures Detected</p>
						)}
					</div>

					<div className='w-full relative overflow-hidden flex-1 flex items-end justify-center'>
						<Image
							src={p2_sprite}
							alt='my gif'
							height={250}
							width={150}
							className='object-contain'
							unoptimized
						/>
					</div>
				</div>
			</div>
			<h1 className='w-[200px] mx-auto text-center pt-4 text-white'>
				Make the gesture!
			</h1>
			<div className='mt-4 p-4 w-[1200px] h-[150px] text-white rounded-xl justify-center flex relative overflow-hidden'>
				<div className='w-1/2 border-b-4 border-b-white border-r'>
					<div className='w-1/4 border-b-8 border-b-green-500 h-[120px] ml-auto'></div>
					{leftElement}
				</div>
				<div className='w-1/2 border-b-4 border-b-white border-l'>
					<div className='w-1/4 border-b-8 border-b-green-500 h-[120px]'></div>
					{rightElement}
				</div>
			</div>
		</motion.div>
	);
}