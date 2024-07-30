import styled from 'styled-components'
import { motion } from "framer-motion";

import { SUGGESTION_TYPE } from '../../assets/constants/Constant';

const SuggestionsWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    .heading{
        border-bottom: 1px solid var(--matt-dark);
        width: 100%;
        padding-bottom: 8px;
    }

    .pills-container{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px;
        width: 100%;

        &:first-child {
            margin-top: 10px;
        }

        &:nth-child(2),
        &:only-child {
            margin-top: 60px;
        }

        .pills {
            border: 1px solid var(--matt-dark);
            padding: 8px 15px;
            border-radius: 30px;
            font-size: 14px;
            cursor: pointer;
            background: var(--matt-dark);
            transition: 0.2s ease-in-out;

            &:hover {
                border: 1px solid var(--sub-text-dark);
            }
        }
    }
`

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
