import React from 'react'
import { motion } from 'framer-motion';
import Image from "next/image";

type Props = {
  finalScore: number;
}

const CompleteSong = ({finalScore}: Props) => {
  return (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-5xl m-auto">
            <div className="flex m-auto max-w-xl">
                <div className="h-[250px] w-1/2 fit-content">
                    <Image src="/images/p1_win.gif" alt="my gif" height={200} width={200} className="object-cover min-h-[250px] min-w-[160px]"/>
                </div>
                <div className="h-[250px] w-1/2  fit-content">
                    <Image src="/images/p2_win.gif" alt="my gif" height={200} width={200} className="object-cover min-h-[250px] min-w-[160px]"/>
                </div>
            </div>
            <p className="text-lg text-medium text-center mt-[75px] border border-white/20 bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur-sm"> You got a score of {finalScore}!</p>
    </motion.div>
  )
}

export default CompleteSong