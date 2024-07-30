import styled from "styled-components"

export const MapPlacesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-top: 10px;

    .places {
        display: flex;
        gap: 10px;
    }

    .place-item {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .rating {
        color: #FFD700;
    }
`

export const PlacePillsWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

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

        a {
            color: #007bff;
            display: flex;
            gap: 7px;
        }
    }
`