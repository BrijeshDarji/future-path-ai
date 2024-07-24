import React, { useRef } from "react";
import { motion } from "framer-motion";

export default function SplitText({ children, onLastWordAnimationComplete = () => { }, ...rest }) {
	let words = children.split(" ");
	const lastWordRef = useRef(null);

	return words.map((word, i) => {
		const isLastWord = i === words.length - 1;

		return (
			<div
				key={children + i}
				style={{ display: "inline-block", overflow: "hidden" }}
			>
				<motion.div
					{...rest}
					style={{ display: "inline-block", willChange: "transform" }}
					custom={i}
					onAnimationComplete={() => {
						if (isLastWord) {
							onLastWordAnimationComplete();
						}
					}}
					ref={isLastWord ? lastWordRef : null}
				>
					{word + (isLastWord ? "" : "\u00A0")}
				</motion.div>
			</div>
		);
	});
}
