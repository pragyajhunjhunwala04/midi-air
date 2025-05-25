'use client';
import React, {useState} from 'react'
import Image from "next/image";
import Button from './Button';
import { motion } from 'framer-motion';
import clsx from 'clsx';

type Props = {}

type Song = {
  id: number,
  songName: string,
  artistName: string,
  imgSrc: string,
  difficulty: string,
};

const songs: Song[] = [
  { id: 1, songName: 'telepatia', artistName: "Kali Uchis", imgSrc: "/images/telepatia.jfif", difficulty: "Tutorial"},
  { id: 2, songName: 'Love Story', artistName: "Taylor Swift", imgSrc: "/images/taylorswift.jfif", difficulty: "Easy"},
  { id: 3, songName: 'Pink Pony Club', artistName: "Chappell Roan", imgSrc: "/images/Chappell_Roan_-_Pink_Pony_Club.png", difficulty: "Medium"},
  { id: 3, songName: 'No One Noticed', artistName: "The Marias", imgSrc: "/images/Chappell_Roan_-_Pink_Pony_Club.png", difficulty: "Hard"},
];


const SelectSong = ({selectedSong}) => {
    const [song, setSong] = useState('');

    function confirmSong() {
       selectedSong(song);
    }

    function changeSong(s : string){
        setSong(s);
    }

  return (
    <div>
        <h1 className="text-4xl font-medium pb-8 mt-12 mx-auto max-w-xl text-center">Select a Song</h1>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <div className="flex flex-4 m-auto">
                    {songs.map((s) => (
                     <motion.div whileHover={{ scale: 1.1 }} className={clsx("w-1/4 m-5 flex flex-col cursor-pointer rounded-xl p-8", s.songName === song ? 'shadow-inner shadow-[#781542]' : 'shadow-none')} onClick={() => changeSong(s.songName)}>
                        <span className="text-normal text-white text-opacity-75 text-xs mb-4 mx-auto w-1/4 text-center">{s.difficulty}</span>
                        <Image
                            src={s.imgSrc}
                            height={300} 
                            width={300}
                            alt={s.songName}
                            className="rounded-xl m-auto"
                        />
                        <div className="text-left">
                            <h2 className="text-lg my-2 text-medium">{s.songName}</h2>
                            <p className="text-normal text-white text-opacity-75 text-xs mb-4">{s.artistName}</p>
                        </div>
                    </motion.div>
                    ))}
            </div>
            <div className="w-[200px] m-auto text-center" onClick={confirmSong}>
                <Button text="Confirm Song"></Button>
            </div>
        </motion.div>
        </div>
    </div>
  )
}

export default SelectSong