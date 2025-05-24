import GradientNotes from '@/components/GradientNotes';
import React from 'react';
import Button from "../components/Button";

type Props = {};

const Home = (props: Props) => {
	return (
	<div>
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
			<div className="max-w-xl mx-auto py-16 justify-center text-center">
				<h2 className="text-md font-normal">Welcome to</h2>
				<h1 className="text-5xl font-medium pt-4 pb-8">Midi-Air</h1>
				<div className="max-w-xs mx-auto">
					<Button text="Start Playing"></Button>
				</div>
			</div>
		</div>
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
			<div className="max-w-4xl mx-auto flex">
				<div className="max-w-50 m-4">
				</div>
				<div className="max-w-50 m-4 border border-white/20 bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur-sm">
					<h3 className="font-medium text-md mb-4">Somewhere between Motion and Melody.</h3>
					<p className="text-white text-opacity-75 text-sm">Enjoy music but don’t know how to play an instrument? Midi-Air takes a song and generates chords in the form of hand signs. Play music with just air hand motions!</p>
				</div>
			</div>
		</div>
		<GradientNotes/>
	</div>

	);
};

export default Home;
