import React from 'react'

import Suggestions from '../../controllers/Suggestions'
import ActionButton from "../../controllers/ActionButton.jsx"

function SuggestionAndActions({
    chat = {},
    handleDynamicSuggestion,
    handlePreBuildSuggestion,
}) {
    return (
        <>
            {
                chat.showSuggestion && (
                    <Suggestions
                        list={chat.suggestions}
                        handleDynamicSuggestion={handleDynamicSuggestion}
                        handlePreBuildSuggestion={handlePreBuildSuggestion}
                    />
                )
            }

            {
                !chat.hideActions && (
                    <ActionButton text={chat.text} />
                )
            }
        </>
    )
}

export default SuggestionAndActions
