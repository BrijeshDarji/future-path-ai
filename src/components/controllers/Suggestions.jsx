import { motion } from "framer-motion";

import { SUGGESTION_TYPE } from '../../assets/constants/Constant';
import { SuggestionsWrapper } from './Suggestions.style';

const findMoreData = [
    {
        title: 'Find nearby Secondary Schools',
        type: SUGGESTION_TYPE.GOOGLE_MAP,
        includedTypes: ["secondary_school"],
        plural: "Secondary Schools"
    },
    {
        title: 'Find nearby Universities',
        type: SUGGESTION_TYPE.GOOGLE_MAP,
        includedTypes: ["university"],
        plural: "Universities"
    },
    {
        title: 'Guide me based on my academic mark-sheet',
        type: SUGGESTION_TYPE.UPLOAD,
    },
]

function Suggestions({
    list = [],
    handleDynamicSuggestion,
    handlePreBuildSuggestion,
}) {
    return (
        <SuggestionsWrapper>
            {list.length
                ? (
                    <div className='pills-container'>
                        <span>
                            You can ask something like,
                        </span>

                        {list.map((item, index) => (
                            <motion.div
                                initial={{ opacity: 0, x: 15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="pills"
                                key={index}
                                onClick={() => handleDynamicSuggestion(item)}
                            >
                                {item}
                            </motion.div>
                        ))}
                    </div>
                )
                : null
            }

            <div className='pills-container'>
                <span>
                    Explore further,
                </span>

                {findMoreData.map((item, index) => (
                    <motion.div
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="pills"
                        key={index}
                        onClick={() => handlePreBuildSuggestion(item)}
                    >
                        {item.title}
                    </motion.div>
                ))}
            </div>
        </SuggestionsWrapper >
    )
}

export default Suggestions;
