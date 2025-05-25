import type { Metadata } from "next";
import { Commissioner } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const commissioner = Commissioner({
	variable: "--font-commissioner",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Midi-Air",
	description: "Somewhere between motion and melody",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${commissioner.variable} antialiased flex flex-col min-h-screen`}
			>
				<Navbar />
				<div className='flex-1 mt-1/5'>{children}</div>
				<footer
					className='row-start-3 flex gap-6 flex-wrap items-center justify-center w-screen h-[100px] mr-10'
					style={{
						background:
							"linear-gradient(to left, #EBA392, #E67E6F, #781542,#481A63, #00758A)",
					}}
				>
					<div
						className='static w-screen h-[100px]'
						style={{
							background:
								"linear-gradient(to bottom, #000000, rgba(0,0,0,0))",
						}}
					/>
				</footer>
			</body>
		</html>
	);
}
