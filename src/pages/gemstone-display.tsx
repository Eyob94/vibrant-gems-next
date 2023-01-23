import Image from "next/image";
import React from "react";
import BlackBtn from "../components/BlackBtn/BlackBtn";

const loader = ({ src }: { src: string }) => {
	return `https://res.cloudinary.com/${src}`;
};

const gemstoneDisplay = () => {
	return (
		<div className="w-full">
			<div className="relative">
				<div className="relative flex h-[80vh] justify-center w-full">
					<Image
						alt="bg"
						src="https://res.cloudinary.com/dqdktlbxw/image/upload/v1674395186/Vibrant/wp5568912_yxhbp6.jpg"
						width={2000}
						height={500}
						className="absolute object-cover w-full"
					/>
					<div className="z-50 flex flex-col items-center justify-center h-full gap-8">
						<div className="text-6xl font-semibold">
							Diamond display technology
						</div>
						<div className="text-2xl font-medium">
							Explore real diamonds in 360°
						</div>
						<div className="text-xl text-center tracking-wider max-w-[40%]">
							Explore your diamond's cut, color, clarity, and sparkle in 360° HD
							views and up to 40x magnification so you can truly understand your
							diamond's features
						</div>
						<BlackBtn text="shop loose diamonds" />
					</div>
				</div>
				<div className="flex h-[80vh]">
					<div className="w-[50%]"></div>
					<div className="w-1/2">
						<Image
							alt="right"
							width={1000}
							height={500}
							className="object-cover w-full h-full"
							src="https://res.cloudinary.com/dqdktlbxw/image/upload/v1674396990/Vibrant/many-size-diamonds-white-background-reflection-surface-d-rendering-172598727_jnjcfr.jpg"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default gemstoneDisplay;
