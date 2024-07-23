import React from 'react'
import styled from 'styled-components'
import { motion } from "framer-motion";

const SuggestionsWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
    margin-top: 10px;
    .heading{
        border-bottom: 1px solid var(--matt-dark);
        width: 100%;
        padding-bottom: 8px;
    }

    .pills-container{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        width: 100%;
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

function Suggestions() {
    const data = [
        {
            title: 'Compare yourself to others',
            content: 'Suggestions'
        },
        {
            title: 'Check five in-demand skills',
            content: 'Suggestions'
        },
        {
            title: 'Learn more',
            content: 'Suggestions'
        },
        {
            title: 'Check again',
            content: 'Suggestions'
        },
    ]
    return (
        <SuggestionsWrapper>
            <div className='pills-container'>
                {data.map((item, index) => (
                    <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="pills" key={index}>
                        {item.title}
                    </motion.div>
                ))}
            </div>
        </SuggestionsWrapper >
    )
}

export default Suggestions;