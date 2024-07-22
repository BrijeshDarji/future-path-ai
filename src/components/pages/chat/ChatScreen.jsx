import { memo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion";

import SplitText from "../../controllers/SplitText";
import ChatScreenWrapper from "./ChatScreen.style";
import 'react-loading-skeleton/dist/skeleton.css';
import Loader from "../../controllers/Loader";
import Suggestions from "../../controllers/Suggestions";
import ActionButton from "../../controllers/ActionButton";

import {
    Logo,
    ExamIcon,
    AcademicIcon,
    ComputerIcon,
    CareerIcon,
    SendIcon
} from "../../../assets/constants/Constant";

function ChatScreen() {
    const commonPromptData = [
        {
            id: 0,
            text: "Which career path is right for me based on my academic result?",
            icon: AcademicIcon,
        },
        {
            id: 1,
            text: "As a recent graduate, what are five in-demand IT jobs I should consider?",
            icon: ComputerIcon,
        },
        {
            id: 2,
            text: "I'm interested in preparing for competitive exams.",
            icon: ExamIcon,
        },
        {
            id: 3,
            text: "Can you offer some guidance?, I just started my career.",
            icon: CareerIcon,
        },
    ]

    const [chatData, setChatData] = useState([]);
    const [hideWelcomePrompt, setHideWelcomePrompt] = useState(true);
    const [textAnimationComplete, setTextAnimationComplete] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChatPrompt = (text, type) => {
        const newChatData = [{ text, type: type }];
        setChatData(newChatData);
        setHideWelcomePrompt(false);

        // just for demo - show loading then data
        setTimeout(() => {
            setLoading(true);
        }, 500);

        setTimeout(() => {
            setChatData((prev) => [
                ...prev,
                { text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", type: "machine" }
            ]);

            setLoading(false);
        }, 3000);


    }

    return (
        <ChatScreenWrapper>
            <div className="max-outlet">
                {hideWelcomePrompt ?
                    (<motion.div initial={{ y: 100 }}
                        whileInView={{ y: 0 }} className="welcome-prompt">
                        <div className="title">
                            Hi there,
                        </div>
                        <div className="title">
                            What would like to know?
                        </div>
                        <div className="content">
                            Use one of the most common prompts below to get started.
                        </div>
                        <div className="cards-container">
                            {
                                commonPromptData.map((item) => (
                                    <motion.div initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: item.id * 0.1 }}
                                        className="card" key={item.id} onClick={() => handleChatPrompt(item.text, "user")}>
                                        <div className="card-txt">
                                            {item.text}
                                            <img src={item.icon} alt="image" />
                                        </div>
                                    </motion.div>
                                ))
                            }
                        </div>
                    </motion.div>) :
                    (<div className="chat-prompt">
                        <AnimatePresence>
                            {
                                chatData && chatData.map((item, index) => (
                                    item.type === "user" ? (
                                        <div className="user-response" key={index}>
                                            {item.text}
                                        </div>
                                    ) : (
                                        <div className="ai-response" key={index}>
                                            <div className="ai-container">
                                                <img src={Logo} alt="logo" width={'25px'} />
                                                <div>
                                                    <SplitText
                                                        initial={{ opacity: 0 }}
                                                        animate="visible"
                                                        onLastWordAnimationComplete={() => (setTextAnimationComplete(true))}
                                                        variants={{
                                                            visible: (i) => ({
                                                                opacity: 1,
                                                                transition: {
                                                                    delay: i * 0.05,
                                                                },
                                                            }),
                                                        }}
                                                    >
                                                        {item.text}
                                                    </SplitText>
                                                    {textAnimationComplete && <>
                                                        <Suggestions />
                                                        <ActionButton text={item.text} />
                                                    </>}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ))
                            }
                        </AnimatePresence>
                        {loading ? <Loader /> : null}
                    </div>)}
                <div className="chat-input">
                    <div className="position-relative">
                        <input type="text" name="chat" id="chat" placeholder="Message to Future Path AI" />
                        <div className="send-wrapper">
                            <img src={SendIcon} alt="send" width={'20px'} />
                        </div>
                    </div>
                </div>
            </div>
        </ChatScreenWrapper>
    )
}

export default memo(ChatScreen)