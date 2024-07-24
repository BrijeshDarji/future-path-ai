import React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.div`
    --color-red: #ff0000;
    --color-orange: #ff7300;
    --color-yellow: #fffb00;
    --color-green: #48ff00;
    --color-cyan: #00ffd5;
    --color-blue: #002bff;
    --color-purple: #7a00ff;
    --color-pink: #ff00c8;
    width: auto;

    .glow-on-hover {
        position: relative;
        width: auto;
        padding: 10px 20px;
        font-size: 14px;
        font-weight: 700;
        border: unset;
        outline: none;
        color: var(--primary);
        border-radius: 35px;
        cursor: pointer;
        z-index: 0;
    }

    .glow-on-hover:before {
        content: "";
        background: linear-gradient(
            45deg,
            var(--color-red),
            var(--color-orange),
            var(--color-yellow),
            var(--color-green),
            var(--color-cyan),
            var(--color-blue),
            var(--color-purple),
            var(--color-pink),
            var(--color-red)
        );
        position: absolute;
        top: -2px;
        left: -2px;
        background-size: 400%;
        z-index: -1;
        filter: blur(5px);
        width: calc(100% + 4px);
        height: calc(100% + 4px);
        animation: glowing 20s linear infinite;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        border-radius: 35px;
    }

    .glow-on-hover:active {
        color: var(--primary);
    }

    .glow-on-hover:active:after {
        background-color: var(--white);
    }

    .glow-on-hover:hover:before {
        opacity: 1;
    }

    .glow-on-hover:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background: var(--white);
        left: 0;
        top: 0;
        border-radius: 35px;
        z-index: -1;
    }
`;

function FormButton({ text, onClick }) {
	return (
		<ButtonWrapper>
			<button className="glow-on-hover" onClick={onClick}>
				{text}
			</button>
		</ButtonWrapper>
	);
}

export default FormButton;
