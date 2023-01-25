import React from "react";
import styles from "./spinner.module.css";
import { v4 } from "uuid";

const Spinner = ({ color }: any) => {
	return (
		<div>
			<div className={`${styles["lds-roller"]} scale-75`}>
				{Array.from({ length: 8 }).map((i) => (
					<div key={v4()} className={`${color} `}></div>
				))}
			</div>
		</div>
	);
};

export default Spinner;
