import styled from "styled-components";

const ChatScreenWrapper = styled.div`
    width: 100%;
    color: var(--white);

    .max-outlet {
        max-width: 1200px;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        padding: 0 50px;

        .chat-input {
            position: fixed;
            bottom: 50px;
            left: 0;
            right: 0;
            width: 100%;
            background-image: radial-gradient(
                rgba(0, 0, 0, 0) 1px,
                var(--background) 1px
            );
            background-size: 4px 4px;
            backdrop-filter: blur(6px);

            .position-relative {
                position: relative;
                width: 100%;
                max-width: 800px;
                margin: 0 auto;
                display: flex;

                input[type="text"] {
                    color: var(--white);
                    padding: 15px 85px 15px 20px;
                    border-radius: 30px;
                    background-color: var(--matt-dark);
                    border: unset;
                    font-size: 14px;
                    width: 100%;
                    outline: none;
                    margin: 0 auto;
                    &::placeholder {
                        color: var(--sub-text-dark);
                    }
                }

                .send-wrapper {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #aa69ff;
                    height: 37px;
                    width: 60px;
                    border-radius: 30px;
                    position: absolute;
                    top: 7px;
                    right: 8px;
                    cursor: pointer;
                }

                .send-loading {
                    background-color: #c9a8f4;
                    cursor: wait;
                }
            }
        }

        @media (max-width: 768px) {
            padding: 0 20px;

            .chat-input {
                .position-relative {
                    width: 90%;
                }
            }
        }

        @media (max-width: 576px) {
            .chat-input {
                .position-relative {
                    width: 90%;
                }
            }
        }
    }

    .welcome-prompt {
        width: 100%;
        height: 100%;
        padding-top: 200px;

        @media (max-width: 576px) {
            padding: 130px 0 115px 0;
        }

        .title {
            font-size: 38px;
            font-weight: 600;
            line-height: normal;
            background: -webkit-linear-gradient(
                45deg,
                rgb(225, 159, 255),
                rgb(85, 22, 251)
            );
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;

            @media (max-width: 768px) {
                font-size: 28px;
            }

            @media (max-width: 576px) {
                font-size: 24px;
            }
        }

        .content {
            margin-top: 10px;
            color: var(--sub-text-dark);
        }

        .cards-container {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 20px;

            .card {
                border: 1px solid var(--matt-dark);
                padding: 20px;
                border-radius: 10px;
                font-size: 14px;
                line-height: 18px;
                width: calc(100% / 4 - 10px);
                height: 170px;
                cursor: pointer;
                transition: 0.2s ease-in-out;

                @media (max-width: 576px) {
                    height: 120px;
                }

                &:hover {
                    background: var(--matt-dark);
                    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
                }

                .card-txt {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    height: 100%;

                    img {
                        margin-top: auto;
                        width: 25px;
                        height: 20px;
                    }
                }

                @media (max-width: 1024px) {
                    width: calc(100% / 3 - 10px);
                }

                @media (max-width: 768px) {
                    width: calc(100% / 2 - 10px);
                }

                @media (max-width: 576px) {
                    width: 100%;
                }
            }
        }
    }

    .chat-prompt {
        padding: 90px 0 100px 0;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 25px;

        .user-response,
        .ai-response {
            padding: 10px 15px;
            display: inline;
            width: fit-content;
        }

        .user-response {
            border-radius: 15px 15px 0 15px;
            margin-left: auto;
            max-width: 400px;
            background: var(--matt-dark);

            @media (max-width: 576px) {
                max-width: 300px;
            }
        }

        .ai-response {
            border-radius: 15px 15px 15px 0px;
            margin-right: auto;
            max-width: 600px;

            .ai-container {
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                width: 100%;
                gap: 20px;
            }
        }
    }
`;

export default ChatScreenWrapper;
