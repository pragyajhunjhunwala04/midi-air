'use client';
import React, {useState} from 'react'
import SelectSong from '@/components/SelectSong';
import PlayTogetherSong from '@/components/PlayTogetherSong';
import clsx from 'clsx';

type Props = {};

const PlayTogether = (props: Props) => {
	const [song, setSong] = useState('');
	const [playSong, setPlaySong] = useState(false);

	const confirmSong = (playSong : string) => {
		setSong(playSong);
		setPlaySong(true);
  	}

	return <div>
		<div className={clsx('', playSong ? 'visible' : 'hidden')}>
			<PlayTogetherSong selectedSong={song}/>
		</div>
		<div className={clsx('', playSong ? 'hidden' : 'visible')}>
			<SelectSong selectedSong={confirmSong}/>
		</div>
	</div>;
};

export default PlayTogether;
