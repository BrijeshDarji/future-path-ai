import styled from 'styled-components'

export const SuggestionsWrapper = styled.div`
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
