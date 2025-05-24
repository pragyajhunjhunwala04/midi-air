import React, { useEffect, useState } from "react";

type Props = {};

const note_count = 20;

const note_colors: string[] = [
	"linear-gradient(to bottom,rgba(255, 110, 197, 0), #EBA392)",
	"linear-gradient(to bottom,rgba(230, 127, 111, 0), #E67E6F)",
	"linear-gradient(to bottom,rgba(120, 21, 66, 0), #781542)",
	"linear-gradient(to bottom,rgba(72, 26, 99, 0), #481A63)",
	"linear-gradient(to bottom, rgba(72, 26, 99, 0), #00758A)",
];

interface NoteStyle extends React.CSSProperties {
	"--duration"?: string;
}

const GradientNotes = (props: Props) => {
	const [domLoaded, setDomLoaded] = useState(false);

	useEffect(() => {
		setDomLoaded(true);
	}, []);

	const drops = Array.from({ length: note_count }).map((_, i) => {
		const left = `${Math.random() * 100}vw`;
		const delay = `${Math.random() * 5}s`;
		const duration = `${3 + Math.random() * 10}s`;
		const background =
			note_colors[Math.floor(Math.random() * note_colors.length)];

		const style: NoteStyle = {
			left,
			animationDelay: delay,
			background,
			"--duration": duration,
		};

		return (
			<div
				key={i}
				className='absolute top-[-10%] w-[10px] h-[60px] opacity-80 animate-fall'
				style={style}
			/>
		);
	});

	if (!domLoaded) {
		return null;
	}

	return (
		<div className='fixed inset-0 z-[-1] pointer-events-none overflow-hidden'>
			{drops}
		</div>
	);
};

export default GradientNotes;
