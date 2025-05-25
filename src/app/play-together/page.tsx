'use client';
import React, {useState} from 'react'
import SelectSong from '@/components/SelectSong';
import PlayTogetherSong from '@/components/PlayTogetherSong';
import CompleteSong from '@/components/CompleteSong';

const PlayTogether = () => {
	const [song, setSong] = useState('');
	const [score, setSongScore] = useState(0);
	const [stage, setStage] = useState(0);

	const confirmSong = (playSong : string) => {
		setSong(playSong);
		setStage(stage + 1);
  	}

	const songScore = (s : number) => {
		setSongScore(s);
		setStage(stage + 1)
  	}

	return <div>
		{stage === 0 && (
		<SelectSong selectedSong={confirmSong} />
		)}

		{stage === 1 && (
		<PlayTogetherSong selectedSong={song} gameScore={songScore} />
		)}

		{stage === 2 && (
		<CompleteSong finalScore={score} />
		)}
	</div>;
};

export default PlayTogether;
