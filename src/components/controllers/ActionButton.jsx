import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { CopyText } from "../helpers/CopyText";

import {
    CopyIcon,
    SpeakIcon,
    MuteIcon,
} from "../../assets/constants/Constant";

import Toast from "../helpers/Toast";

const ActionWrapper = styled.div`
    width: 100%;
    display: flex;
    margin: 15px 10px;
    gap: 10px;
    align-items: center;
    height: 33px;
    img {
        width: 20px;
        vertical-align: sub;
        cursor: pointer;
    }
`;

function ActionButton({ text }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [utterance, setUtterance] = useState(null);

    useEffect(() => {
        const handleSpeechEnd = () => setIsPlaying(false);
        const handleSpeechError = () => setIsPlaying(false);

        speechSynthesis.addEventListener('speechend', handleSpeechEnd);
        speechSynthesis.addEventListener('speecherror', handleSpeechError);

        return () => {
            speechSynthesis.removeEventListener('speechend', handleSpeechEnd);
            speechSynthesis.removeEventListener('speecherror', handleSpeechError);
        };
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setShowToast(false);
        }, 2000);
    }, [showToast])

    const stopSpeech = () => {
        speechSynthesis.cancel(); // Cancel all ongoing speech
    };

    const handleSpeakClick = () => {
        if (isPlaying) {
            stopSpeech();
            setIsPlaying(false);
        } else {
            const newUtterance = new SpeechSynthesisUtterance(text);

            // Set the voice if available
            const voices = speechSynthesis.getVoices();
            const usEnglishVoice = voices.find(voice => voice.name === 'Google US English');
            if (usEnglishVoice) {
                newUtterance.voice = usEnglishVoice;
            }

            setUtterance(newUtterance);

            newUtterance.onend = () => {
                setIsPlaying(false);
            };
            newUtterance.onerror = () => {
                setIsPlaying(false);
            };

            speechSynthesis.speak(newUtterance);
            setIsPlaying(true);
        }
    };


    return (
        <ActionWrapper>
            <img
                src={CopyIcon}
                alt="CopyIcon"
                title="Copy text"
                onClick={() => (CopyText(text), setShowToast(true))}
            />
            <div onClick={handleSpeakClick}>
                {!isPlaying ?
                    <img src={SpeakIcon} alt="SpeakIcon" title='Listen' /> :
                    <img src={MuteIcon} alt="MuteIcon" title='Stop listening' />
                }
            </div>
            <Toast text={"Copied!"} isVisible={showToast} />
        </ActionWrapper>
    );
}

export default ActionButton;
