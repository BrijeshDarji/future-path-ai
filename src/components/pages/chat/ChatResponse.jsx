import { useState } from 'react';

import SplitText from '../../controllers/SplitText'
import Suggestions from "../../controllers/Suggestions.jsx"
import ActionButton from "../../controllers/ActionButton.jsx"

function ChatResponse({ chat }) {
    const [textAnimationComplete, setTextAnimationComplete] = useState(false);

    return (
        <>
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
                {chat.text}
            </SplitText>

            {
                textAnimationComplete && (
                    <>
                        <Suggestions />
                        <ActionButton text={chat.text} />
                    </>
                )
            }
        </>
    )
}

export default ChatResponse
