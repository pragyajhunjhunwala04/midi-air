'use client';
import Link from "next/link";
import Button from "../components/Button";
import React from "react";
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

const Navbar = () => {
	const pathname = usePathname();
	return (
		<nav
			className='w-full shadow-md'
			style={{
				background:
					"linear-gradient(to right, #EBA392, #E67E6F, #781542,#481A63, #00758A)",
			}}
		>
			<div className='max-w-screen relative z-10 font-commissioner flex justify-between h-[100px] py-4' style={{
					background: 
						"linear-gradient(to top, #000000, rgba(0,0,0,0))",
				}}>
				<Link href='/' className='font-semibold text-xl pl-10'>
					Midi-Air
				</Link>
				<div className='mx-auto flex justify-center space-x-12'>
					<span className="relative inline-block h-fit cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100">
						{ pathname === '/' ? <Link className="font-medium underline underline-offset-4 text-opacity-100" href="/">Home</Link>: <Link className="font-normal text-[#F4F5F7] text-opacity-50 hover:text-white" href="/">Home</Link>}
					</span>
					<span className="relative inline-block h-fit cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100">
						{ pathname === '/play-together' ? <Link className="font-medium underline underline-offset-4 text-opacity-100" href="/play-together">Play Together</Link>: <Link className="font-normal text-[#F4F5F7] text-opacity-50 hover:text-white" href="/play-together">Play Together</Link>}
					</span>
					<span className="relative inline-block h-fit cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100">
						{ pathname === '/air-piano' ? <Link className="font-medium underline underline-offset-4 text-opacity-100" href="/air-piano">Freeplay</Link>: <Link className="font-normal text-[#F4F5F7] text-opacity-50 hover:text-white" href="/air-piano">Freeplay</Link>}
					</span>
				</div>
				<div className="mr-8">
					<Link href='/air-piano'><Button text='Try it'></Button></Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
