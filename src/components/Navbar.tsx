import Link from "next/link";
import Button from "../components/Button";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
	return (
		<nav
			className='w-full py-4 shadow-md'
			style={{
				background:
					"linear-gradient(to right, #EBA392, #E67E6F, #781542,#481A63, #00758A)",
			}}
		>
			<div className='max-w-screen relative z-10 font-commissioner flex justify-between z-10'>
				<Link href='/home' className='font-semibold text-xl pl-10'>
					Midi-Air
				</Link>
				<div className='mx-auto flex justify-center space-x-12 text-lg font-normal text-[#F4F5F7] hover:text-white'>
					<Link href='/home'>Home</Link>
					<Link href='/play-together'>Play Together</Link>
					<Link href='/air-piano'>Freeplay</Link>
				</div>
				<div className="mr-8">
					<Button text='Try it'></Button>
				</div>
			</div>

			{/* Commented out the original gradient because it was causing layout problems with the child elements */}

			<div
				className='absolute left-0 top-0 w-screen h-[140px] z-0'
				style={{
					background:
						"linear-gradient(to right, #EBA392, #E67E6F, #781542,#481A63, #00758A)",
				}}
			/>
			<div
				className='absolute left-0 top-0 w-screen h-[140px] z-0'
				style={{
					background:
						"linear-gradient(to top, #000000, rgba(0,0,0,0))",
				}}
			/>
		</nav>
	);
};

export default Navbar;
