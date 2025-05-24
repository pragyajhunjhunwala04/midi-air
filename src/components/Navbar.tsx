import Link from 'next/link';
import React from 'react';

type Props = {};

const Navbar = (props: Props) => {
	return (
		<nav className='w-full py-4 shadow-md'>
			<div className='max-w-7xl mx-auto flex justify-center space-x-12 text-lg font-medium text-white'>
				<Link href='/home'>Home</Link>
				<Link href='/about'>About Us</Link>
				<Link href='/air-piano'>Air Piano</Link>
			</div>
		</nav>
	);
};

export default Navbar;
