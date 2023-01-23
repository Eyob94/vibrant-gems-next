import Image from "next/image";
import React from "react";
import BlackBtn from "../components/BlackBtn/BlackBtn";

const loader = ({ src }: { src: string }) => {
	return `https://res.cloudinary.com/${src}`;
};

const gemstoneDisplay = () => {
	return (
		<div className="w-full h-screen overflow-y-auto scroll-container">
			<div className="relative h-screen scroll-area">
				<div className="relative flex h-[80vh] justify-center w-full">
					<Image
						alt="bg"
						src="https://res.cloudinary.com/dqdktlbxw/image/upload/v1674395186/Vibrant/wp5568912_yxhbp6.jpg"
						width={2000}
						height={500}
						className="absolute object-cover w-full"
					/>
					<div className="z-10 flex flex-col items-center justify-center h-full gap-8">
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
			</div>
			<div className="flex h-screen scroll-area">
				<div className="w-[50%]">
					<div className="flex flex-col items-center justify-center w-full h-full gap-8">
						<div className="text-2xl font-bold uppercase">
							Go beyond your grading certificate
						</div>
						<div className="text-center tracking-wider text-xl max-w-[60%]">
							Based on GIA certification alone two diamonds with the same
							specifications can seem practically identical. Our Diamond Display
							Technology™ gives you a{" "}
							<span className="font-bold">detailed</span> and{" "}
							<span className="font-bold">fully immersive experience</span> to
							help you understand your diamond's quality.
						</div>
						<BlackBtn text="Learn more" />
					</div>
				</div>

				<div className="w-1/2">
					<Image
						alt="right"
						width={1000}
						height={500}
						className="object-cover w-full h-full"
						src="https://res.cloudinary.com/dqdktlbxw/image/upload/v1674484374/Vibrant/2463921_xkdnyo.jpg"
					/>
				</div>
			</div>

			<div className="flex h-screen scroll-area">
				<div className="w-1/2">
					<Image
						alt="right"
						width={1000}
						height={50}
						className="object-cover w-full h-full"
						src="https://res.cloudinary.com/dqdktlbxw/image/upload/v1674460735/Vibrant/Blog-Fancy-Colored-Diamonds-All-You-Need-To-Know-cover-1_f8ebb7.jpg"
					/>
				</div>
				<div className="w-[50%]">
					<div className="flex flex-col items-center justify-center w-full h-full gap-8">
						<div className="text-2xl font-bold uppercase">
							Fancy colored diamonds, up close
						</div>
						<div className="text-center tracking-wider text-xl max-w-[60%]">
							Discover our wide range of fancy-colored diamonds nd natural
							gemstones for an exotic alternative to colorless diamonds.
						</div>
						<BlackBtn text="Shop fancy colored diamonds" />
					</div>
				</div>
			</div>
			<div className="flex scroll-area h-screen bg-[#FAFAFA]">
				<div className="w-[50%]">
					<div className="flex flex-col items-center justify-center w-full h-full gap-12">
						<div className="text-5xl font-bold tracking-wider uppercase">
							GIVe us a ring
						</div>
						<div className="text-center tracking-widest text-xl max-w-[80%]">
							Got questions? Contact our{" "}
							<span className="font-bold">
								24/7 non-commisioned jewelry experts
							</span>{" "}
							for a personalized diamond consultation{" "}
							<span className="font-bold">Free of charge</span>
						</div>
						<BlackBtn text="book a consultation" />
					</div>
				</div>
				<div className="flex items-center w-1/2 h-full">
					<Image
						alt="right"
						width={1000}
						height={50}
						className="object-cover "
						src="https://res.cloudinary.com/dqdktlbxw/image/upload/v1674463993/Vibrant/ring_eenphl.png"
					/>
				</div>
			</div>
		</div>
	);
};

export default gemstoneDisplay;
