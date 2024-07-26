import { memo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import LandingWrapper from "./HomeScreen.style";
import FormButton from "./../../controllers/FormButton";
import SliderLanding from "./../../controllers/SliderLanding";
import { BackgroundImage, Logo } from "../../../assets/constants/Constant";
import { URL_CHAT_SCREEN } from "../../../assets/constants/SitePath";

function HomeScreen() {
	const navigate = useNavigate();

	const commonAnimation = {
		initial: {
			opacity: 0,
			y: 50,
		},
		whileInView: { opacity: 1, y: 0 },
	};

	return (
		<LandingWrapper>
			<motion.img
				initial={{ opacity: 0.2, y: -"100%" }}
				whileInView={{ opacity: 1, y: 0 }}
				src={BackgroundImage}
				alt="backgroundImage"
				className="main-bg-image"
			/>

			<div className="inner-container">
				<motion.header
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
				>
					<div className="logo-container">
						<img src={Logo} alt="logo" width={"40px"} />
						<div className="logo-text">FuturePath AI</div>
					</div>
					<FormButton
						text={"Let's get started!"}
						onClick={() => {
							navigate(URL_CHAT_SCREEN);
						}}
					/>
				</motion.header>

				<div className="main-container">
					<div className="left-heading">
						<div className="title">
							<motion.div
								{...commonAnimation}
								transition={{ delay: 0.5 }}
							>
								Find your career path,
							</motion.div>
							<motion.div
								{...commonAnimation}
								transition={{ delay: 0.5 }}
								className="gradient-active"
							>
								Now with AI.
							</motion.div>
						</div>
						<motion.p
							{...commonAnimation}
							transition={{ delay: 0.7 }}
							className="content"
						>
							Personalized career guidance for Post-10th and 12th
							grade students using AI/ML.
						</motion.p>
						<motion.div
							{...commonAnimation}
							transition={{ delay: 0.9 }}
						>
							<FormButton
								text={"Get Started"}
								onClick={() => {
									navigate(URL_CHAT_SCREEN);
								}}
							/>
						</motion.div>
					</div>
					<motion.div
						{...commonAnimation}
						transition={{ delay: 0.5 }}
						className="right-heading"
					>
						<SliderLanding />
					</motion.div>
				</div>
			</div>
		</LandingWrapper>
	);
}

export default memo(HomeScreen);
