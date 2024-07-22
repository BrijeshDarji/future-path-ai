import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from "framer-motion";

const ToastWrapper = styled.div`
    .container{
        width: fit-content;
        max-width: 200px;
        background: linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
        border-radius: 30px;
        font-size: 14px;
        padding: 7px 15px 7px 10px;
        display: flex;
        align-items: center;
        gap: 5px;
    }
`

function Toast({ text, isVisible }) {
    const [hideAnimationTag, setHideAnimationTag] = useState(isVisible);

    useEffect(() => {
        if (isVisible) {
            setHideAnimationTag(true);
        } else {
            const timer = setTimeout(() => setHideAnimationTag(false), 300); // Match the exit animation duration
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    return (
        <ToastWrapper>
            <AnimatePresence>
                {hideAnimationTag && <motion.div
                    className='container'
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}>
                    <svg width="20px" height="20px" viewBox="0 0 48 48" version="1.1">
                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="ic_fluent_checkmark_circle_48_filled" fill="#ffffff" fillRule="nonzero">
                                <path d="M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M32.6338835,17.6161165 C32.1782718,17.1605048 31.4584514,17.1301307 30.9676119,17.5249942 L30.8661165,17.6161165 L20.75,27.732233 L17.1338835,24.1161165 C16.6457281,23.6279612 15.8542719,23.6279612 15.3661165,24.1161165 C14.9105048,24.5717282 14.8801307,25.2915486 15.2749942,25.7823881 L15.3661165,25.8838835 L19.8661165,30.3838835 C20.3217282,30.8394952 21.0415486,30.8698693 21.5323881,30.4750058 L21.6338835,30.3838835 L32.6338835,19.3838835 C33.1220388,18.8957281 33.1220388,18.1042719 32.6338835,17.6161165 Z"></path>
                            </g>
                        </g>
                    </svg>
                    {text}
                </motion.div>}
            </AnimatePresence>
        </ToastWrapper>
    )
}

export default Toast