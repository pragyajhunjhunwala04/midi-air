'use client';
import GradientNotes from '@/components/GradientNotes';
import React from 'react';
import Button from "../components/Button";
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';

type Props = {};

const Home = (props: Props) => {
	return (
	<div>
		<motion.div
		initial={{ opacity: 0, y: 30 }}
		whileInView={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.6, ease: 'easeOut' }}
		viewport={{ once: true, amount: 0.2 }} 
		className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
			<div className="max-w-xl mx-auto py-16 justify-center text-center">
				<h2 className="text-md font-normal">Welcome to</h2>
				<h1 className="text-5xl font-medium pt-4 pb-8">Midi-Air</h1>
				<div className="max-w-xs mx-auto">
					<Link href='/play-together'>
						<Button text="Start Playing"></Button>
					</Link>
				</div>
			</div>
		</motion.div>
		<motion.div
		initial={{ opacity: 0, y: 30 }}
		whileInView={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.6, ease: 'easeOut' }}
		viewport={{ once: true, amount: 0.2 }}  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
			<div className="max-w-4xl mx-auto flex">
				<div className="w-1/2 m-4 overflow-clip">
					<Image
						src="/images/keyboard.svg"
						height={300} 
						width={200}
						alt="Rainbow Keyboard"
						className="w-[400px]"
					/>
				</div>
				<div className="w-1/2 m-4 border border-white/20 bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur-sm">
					<h3 className="font-medium text-md mb-4">Somewhere between Motion and Melody.</h3>
					<p className="text-white text-opacity-75 text-sm">Enjoy music but don’t know how to play an instrument? Midi-Air takes a song and generates chords in the form of hand signs. Play music with just air hand motions!</p>
				</div>
			</div>
		</motion.div>

		<motion.div
		initial={{ opacity: 0, y: 30 }}
		whileInView={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.6, ease: 'easeOut' }}
		viewport={{ once: true, amount: 0.2 }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 justify-center">
			<h2 className="text-xl font-medium pt-4 pb-8 text-center">How to Play</h2>
			<Image
						src="images/hands-asl-interpreting-solid.svg"
						height={200} 
						width={200}
						alt="ASL Hands"
						className="w-[200px] m-auto pb-8"
					/>
			<div className="max-w-4xl m-auto border border-white/20 bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur-sm">
				<p className="mb-4">Pick a song from a list. Hand signs will appear on the screen to represent chords.
					When the sign reaches the line, create the correct sign in the camera.
					You will receive points for every correct sign made.</p>
					<div className=" w-[250px] py-2 m-auto text-center rounded-full bg-white text-black transition-colors duration-150 cursor-pointer hover:shadow-[#781542] hover:shadow-md">
						<Link href='/play-together'>
							Play Together
						</Link>
					</div>
				<br></br>
				<p>Want to just play with the camera? Try our &nbsp;
					<span className="relative inline-block cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#781542] after:transition-transform after:duration-300 hover:after:scale-x-100">
						<Link href='/air-piano'>
							Freeplay Mode &rarr;
						</Link>
					</span>
				</p>
			</div>
		</motion.div>
		<GradientNotes/>
	</div>

	);
};

export default Home;
