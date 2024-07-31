import { useState } from 'react';

import SplitText from '../../controllers/SplitText'
import Suggestions from "../../controllers/Suggestions.jsx"
import ActionButton from "../../controllers/ActionButton.jsx"
import PlacesResponse from './PlacesResponse.jsx';
import ImageUploader from './ImageUploader.jsx';

function ChatResponse({
    chat,
    handleDynamicSuggestion,
    handlePreBuildSuggestion,
}) {
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

            {chat.placesData && (
                <PlacesResponse
                    places={chat.placesData}
                />
            )}

            {chat.showImageBox && (
                <ImageUploader />
            )}

            {textAnimationComplete && (
                <>
                    {chat.showSuggestion && (
                        <Suggestions
                            list={chat.suggestions}
                            handleDynamicSuggestion={handleDynamicSuggestion}
                            handlePreBuildSuggestion={handlePreBuildSuggestion}
                        />
                    )}
                    <ActionButton text={chat.text} />
                </>
            )}
        </>
    )
}

export default ChatResponse
