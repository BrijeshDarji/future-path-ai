import { useState } from 'react';

import SplitText from '../../controllers/SplitText'
import SuggestionAndActions from './SuggestionAndActions.jsx';
import PlacesResponse from './PlacesResponse.jsx';
import ImageUploader from './ImageUploader.jsx';

function ChatResponse({
    chat,
    handleDynamicSuggestion,
    handlePreBuildSuggestion,
    setInputLoading,
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
                <ImageUploader
                    chat={chat}
                    handleDynamicSuggestion={handleDynamicSuggestion}
                    handlePreBuildSuggestion={handlePreBuildSuggestion}
                    setInputLoading={setInputLoading}
                />
            )}

            {textAnimationComplete && (
                <SuggestionAndActions
                    chat={chat}
                    handleDynamicSuggestion={handleDynamicSuggestion}
                    handlePreBuildSuggestion={handlePreBuildSuggestion}
                />
            )}
        </>
    )
}

export default ChatResponse
