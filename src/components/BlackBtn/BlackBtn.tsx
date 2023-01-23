import React, { FC } from "react";

type BlackBtnProps = {
	text: string;
};

const BlackBtn: FC<BlackBtnProps> = ({ text }) => {
	return (
		<button className="flex items-center justify-center h-16 text-xl tracking-widest text-white uppercase bg-black hover:shadow-black/20 hover:scale-[102.5%] active:scale-100 active:shadow-none transition-all duration-300 hover:shadow-lg w-96">
			{text}
		</button>
	);
};

export default BlackBtn;
