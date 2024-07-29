import { memo, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion";

import Loader from "../../controllers/Loader";

import 'react-loading-skeleton/dist/skeleton.css';
import ChatScreenWrapper from "./ChatScreen.style";

import {
    Logo,
    ExamIcon,
    AcademicIcon,
    ComputerIcon,
    CareerIcon,
    SendIcon
} from "../../../assets/constants/Constant";

import axiosInstance from "../../helpers/AxiosConfig";
import ChatResponse from "./ChatResponse";

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

function ChatScreen() {

    const [chatData, setChatData] = useState([]);
    const [message, setMessage] = useState('');
    const [showWelcomePrompt, setShowWelcomePrompt] = useState(true);
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom whenever messages change
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatData]);

    const handleSendMessage = (input) => {
        const userInput = input || message

        showWelcomePrompt && setShowWelcomePrompt(false);

        if (userInput.trim()) {
            setChatData((prev) => [
                ...prev,
                {
                    text: userInput,
                    type: "user"
                }
            ]);
            setLoading(true)

            axiosInstance.post(
                "/api/chat-bot",
                {
                    "user_input": userInput
                }
            )
                .then(response => {
                    setChatData((prev) => [
                        ...prev,
                        {
                            text: response.data.reply,
                            type: "machine",
                        }
                    ]);
                })
                .catch(error => {
                    console.log("🚀 ~ handleSendMessage ~ error:", error)
                })
                .finally(() => {
                    setLoading(false)
                })
            setMessage(''); // Clear the input field after sending
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <ChatScreenWrapper>
            <div className="max-outlet">
                {showWelcomePrompt
                    ? (
                        <motion.div
                            initial={{ y: 100 }}
                            whileInView={{ y: 0 }}
                            className="welcome-prompt"
                        >
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
                                {commonPromptData.map((item) => (
                                    <motion.div initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: item.id * 0.1 }}
                                        className="card"
                                        key={item.id}
                                        onClick={() => handleSendMessage(item.text)}
                                    >
                                        <div className="card-txt">
                                            {item.text}
                                            <img src={item.icon} alt="image" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )
                    : (
                        <div className="chat-prompt">
                            <AnimatePresence>
                                {
                                    chatData && chatData.map((item, index) => (
                                        item.type === "user"
                                            ? (
                                                <div className="user-response" key={index}>
                                                    {item.text}
                                                </div>
                                            )
                                            : (
                                                <div className="ai-response" key={index}>
                                                    <div className="ai-container">
                                                        <img
                                                            src={Logo}
                                                            alt="logo"
                                                            width={'25px'}
                                                        />

                                                        <div>
                                                            <ChatResponse chat={item} />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                    ))
                                }
                            </AnimatePresence>

                            {loading ? <Loader /> : null}
                        </div>
                    )
                }

                <div className="chat-input">
                    <div className="position-relative">
                        <input
                            type="text"
                            name="chat"
                            id="chat"
                            placeholder="Message FuturePath AI"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />

                        <div
                            className="send-wrapper"
                            onClick={handleSendMessage}
                        >
                            <img
                                src={SendIcon}
                                alt="send"
                                width={'20px'}
                            />
                        </div>
                    </div>
                </div>

                <div ref={bottomRef} />
            </div>
        </ChatScreenWrapper>
    )
}

export default memo(ChatScreen)
