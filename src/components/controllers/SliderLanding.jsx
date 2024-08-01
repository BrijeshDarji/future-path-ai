import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import SplitText from "./SplitText";

import { Logo } from "../../assets/constants/Constant";

const SliderWrapper = styled.div`
.slider {
    position: relative;

    .image-wrapper {
        width: 510px;
        height: 467px;
        border-radius: 35px;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        @media (max-width: 1024px) {
            width: 370px;
            height: 267px;
        }

        @media (max-width: 768px) {
            width: 100%;
        }
    }

    .slider-text {
        position: absolute;
        margin-top: -55px;
        right: 20px;
        background-color: var(--matt-dark);
        padding: 15px;
        border-radius: 10px;
        font-size: 14px;
        line-height: normal;
        max-width: 330px;
        width: 100%;
        height: auto;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

        .d-flex {
            display: flex;
            height: 100%;
            align-items: flex-start;
        }

        .prompt-icon {
            margin-right: 15px;
        }

        @media (max-width: 768px) {
            right: 0;
            left: 0;
            margin: -50px auto 0 auto;
            width: calc(100% - 10px);
        }
    }
}
`;

const timePerSlide = 5 * 1000;

const contentArray = [
	{
		id: 0,
		text: "Which career options are open to Science stream students?",
		image:
			"https://cdn.dribbble.com/userupload/3566470/file/original-28fcb0756f184d9e12cb0fddfd8ecdd5.png?resize=752x",
		prompt_icon:
			"https://www.gstatic.com/lamda/images/landing/a/i18n/en/ma4_aGFj00iXnaxSvfE0mItTt.png",
		prompt_type: "user",
	},
	{
		id: 1,
		text: "Career options include Engineering, Medicine, Research, Information Technology, Biotechnology, and many more",
		image:
			"https://cdn.dribbble.com/users/2092964/screenshots/15599853/media/a7eb7c74ab820c8b5f57da3a66fc86df.png",
		prompt_icon: Logo,
		prompt_type: "machine",
	},
];

const SliderLanding = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % contentArray.length);
		}, timePerSlide);

		// Cleanup interval on component unmount
		return () => clearInterval(interval);
	}, []);

	return (
		<SliderWrapper>
			<AnimatePresence>
				<div className="slider">
					{contentArray.map((item, index) =>
						index === currentIndex
							? (
								<motion.div key={item.id}>
									<motion.div
										initial={{ opacity: 0, y: 50 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.5 }}
										className="image-wrapper"
									>
										<img
											src={item.image}
											alt="image-slider"
										/>
									</motion.div>

									<motion.div
										initial={{ y: 50 }}
										animate={{ y: 0 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.5 }}
										className="slider-text"
									>
										<div className="d-flex">
											<motion.img
												initial={{ opacity: 0, scale: 0.5 }}
												animate={{ opacity: 1, scale: 1 }}
												exit={{ opacity: 0 }}
												transition={{ duration: 0.5 }}
												src={item.prompt_icon}
												alt="prompt_icon"
												width={item.prompt_type === "user" ? "45px" : "25px"}
												className="prompt-icon"
											/>

											<div>
												<SplitText
													initial={{ opacity: 0 }}
													animate="visible"
													variants={{
														visible: (i) => ({
															opacity: 1,
															transition: {
																delay: i * 0.1,
															},
														}),
													}}
												>
													{item.text}
												</SplitText>
											</div>
										</div>
									</motion.div>
								</motion.div>
							) : null
					)}
				</div>
			</AnimatePresence>
		</SliderWrapper>
	);
};

export default SliderLanding;
