import { memo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import clsx from 'clsx';
import axios from "axios";

import Loader from "../../controllers/Loader";

import 'react-loading-skeleton/dist/skeleton.css';
import ChatScreenWrapper from "./ChatScreen.style";

import {
    Logo,
    ExamIcon,
    AcademicIcon,
    ComputerIcon,
    CareerIcon,
    SendIcon,
    LoadingIcon,
    CHAT_TYPE,
    SUGGESTION_TYPE,
    googlePlacesApiUrl,
    googlePlacesApiKey,
} from "../../../assets/constants/Constant";

import axiosInstance from "../../helpers/AxiosConfig";
import ChatResponse from "./ChatResponse";
import ImageUploader from "./ImageUploader";

const commonPromptData = [
    {
        id: 0,
        text: "What are some good online resources for career planning after 12th grade?",
        icon: CareerIcon,
    },
    {
        id: 1,
        text: "As a recent graduate, what are five in-demand IT jobs I should consider?",
        icon: ComputerIcon,
    },
    {
        id: 2,
        text: "I'm interested in preparing for competitive exams",
        icon: ExamIcon,
    },
    {
        id: 3,
        text: "Can I pursue professional courses directly after 10th?",
        icon: AcademicIcon,
    },
]

function ChatScreen() {

    const [chatData, setChatData] = useState([]);
    const [message, setMessage] = useState('');
    const [showWelcomePrompt, setShowWelcomePrompt] = useState(true);
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    const handleSendMessage = (input) => {
        const userInput = input || message

        showWelcomePrompt && userInput && setShowWelcomePrompt(false);

        if (userInput.trim()) {
            setChatData((prev) => {
                prev.forEach(data => {
                    if (data.showSuggestion) {
                        data.showSuggestion = false
                    }
                })

                return [
                    ...prev,
                    {
                        text: userInput,
                        type: CHAT_TYPE.USER
                    }
                ]
            });
            setMessage('');
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
                            type: CHAT_TYPE.SYSTEM,
                            suggestions: response.data.suggestions || [],
                            showSuggestion: true
                        }
                    ]);
                })
                .catch(error => {
                    const errorMessage = error.response?.data?.message || error.message
                    toast.error(errorMessage)

                    /* setChatData((prev) => {
                        prev.forEach(data => {
                            if (data.showSuggestion) {
                                data.showSuggestion = false
                            }
                        })

                        return [
                            ...prev,
                            {
                                text: "FAKE_ERROR_RESPONSE",
                                type: CHAT_TYPE.SYSTEM,
                                showSuggestion: true
                            }
                        ]
                    }); */
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handlePreBuildSuggestion = (suggestion) => {
        setChatData((prev) => {
            prev.forEach(data => {
                if (data.showSuggestion) {
                    data.showSuggestion = false
                }
            })

            return [
                ...prev,
                {
                    text: suggestion.title,
                    type: CHAT_TYPE.USER
                }
            ]
        });

        if (suggestion.type === SUGGESTION_TYPE.GOOGLE_MAP) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    let lat = position.coords.latitude;
                    let long = position.coords.longitude;

                    if (!lat || !long) {
                        toast.error("latitude and longitude are not available!")
                        return
                    }
                    setLoading(true)

                    axios({
                        headers: {
                            "X-Goog-Api-Key": googlePlacesApiKey,
                            "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.googleMapsUri,places.rating,places.websiteUri",
                        },
                        url: googlePlacesApiUrl,
                        method: "post",
                        data: {
                            "includedTypes": suggestion.includedTypes,
                            "excludedTypes": suggestion.excludedTypes,
                            "maxResultCount": 10,
                            "locationRestriction": {
                                "circle": {
                                    "center": {
                                        "latitude": 23.0340417,
                                        "longitude": 72.5108759
                                    },
                                    "radius": 50000 // In meters
                                }
                            }
                        }
                    })
                        .then(response => {
                            const places = response.data?.places
                            const totalPlaces = places?.length || 0

                            if (!totalPlaces) {
                                toast.error(`We couldn't find "${suggestion.title} within 50 KMs radius"`)
                                return
                            }
                            const text = `Sure! Here are the top ${totalPlaces} nearby ${suggestion.plural} within 50 KMs radius.`

                            setChatData((prev) => {
                                prev.forEach(data => {
                                    if (data.showSuggestion) {
                                        data.showSuggestion = false
                                    }
                                })

                                return [
                                    ...prev,
                                    {
                                        text: text,
                                        type: CHAT_TYPE.SYSTEM,
                                        showSuggestion: true,
                                        hideActions: true,
                                        placesData: places,
                                    }
                                ]
                            });
                        })
                        .catch(error => {
                            const errorMessage = error.response?.data?.message || error.message
                            toast.error(errorMessage)
                        })
                        .finally(() => {
                            setLoading(false)
                        })
                },
                    (error) => {
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                toast.error(`You've denied the location access request, so we can't "${suggestion.title}". If you want then please give us location access`);
                                break;

                            case error.POSITION_UNAVAILABLE:
                                toast.error("Location information is unavailable, so we can't fetch nearby suggestion");
                                break;

                            case error.TIMEOUT:
                                toast.error("The request to get your location is timed out, so we can't fetch nearby suggestion");
                                break;

                            case error.UNKNOWN_ERROR:
                                toast.error("An unknown error occurred while fetching your location, so we can't fetch nearby suggestion");
                                break;

                            default:
                                toast.error("An unknown error occurred while fetching your location, so we can't fetch nearby suggestion");
                                break;
                        }
                    }
                );
            }
            else {
                toast.error("Geolocation is not supported by this browser, so we can't fetch nearby suggestion");
            }
        }
        else if (suggestion.type === SUGGESTION_TYPE.UPLOAD) {
            const text = `Sure! Please upload markSheet photo of 10th, 12th or any graduation.`

            setChatData((prev) => {
                prev.forEach(data => {
                    if (data.showSuggestion) {
                        data.showSuggestion = false
                    }
                })

                return [
                    ...prev,
                    {
                        text: text,
                        type: CHAT_TYPE.SYSTEM,
                        showImageBox: true,
                    }
                ]
            });
        }
    }

    return (
        <ChatScreenWrapper>
            <div className="max-outlet" id="max-outlet">
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
                                What would you like to know?
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
                                        item.type === CHAT_TYPE.USER
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
                                                            <ChatResponse
                                                                chat={item}
                                                                handleDynamicSuggestion={(item) => handleSendMessage(item)}
                                                                handlePreBuildSuggestion={handlePreBuildSuggestion}
                                                            />
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
                        <div></div>
                        <input
                            type="text"
                            name="chat"
                            id="chat"
                            placeholder="Message FuturePath AI"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            spellCheck="true"
                        />

                        <div
                            className={clsx("send-wrapper", loading && "send-loading")}
                            onClick={() => handleSendMessage()}
                        >
                            {loading
                                ? (
                                    <img
                                        src={LoadingIcon}
                                        alt="Loading"
                                        width={60}
                                        height="auto"
                                    />
                                )
                                : (
                                    <img
                                        src={SendIcon}
                                        alt="send"
                                        width={'20px'}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>

                <div ref={bottomRef} />
            </div>
        </ChatScreenWrapper>
    )
}

export default memo(ChatScreen)
