'use client';
import React, {useState} from 'react'
import SelectSong from '@/components/SelectSong';
import PlayTogetherSong from '@/components/PlayTogetherSong';
import CompleteSong from '@/components/CompleteSong';
import clsx from 'clsx';

type Props = {};

const PlayTogether = (props: Props) => {
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
		<div className={clsx('', stage == 0 ? 'visible' : 'hidden')}>
			<SelectSong selectedSong={confirmSong}/>
		</div>
		<div className={clsx('', stage == 1 ? 'visible' : 'hidden')}>
			<PlayTogetherSong selectedSong={song} gameScore={songScore}/>
		</div>
		<div className={clsx('', stage == 2 ? 'visible' : 'hidden')}>
			<CompleteSong finalScore={score}/>
		</div>
	</div>;
};

export default PlayTogether;
