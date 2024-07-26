import { memo } from "react"
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { URL_OPENXCELL } from "../../assets/constants/SitePath";
import { OpenXcell } from './../../assets/constants/Constant'

const HeaderWrapper = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    border-bottom: 1px solid var(--matt-dark);
    background-image: radial-gradient(rgba(0, 0, 0, 0) 1px, var(--background) 1px);
    background-size: 4px 4px;
    backdrop-filter: blur(6px);
    font-size: 14px;
    line-height: 14px;
    z-index: 999;

    .logo {
        font-size: 24px;
        font-weight: 900;
        line-height: 30px;
        background: -webkit-linear-gradient(
            225deg,
            rgb(255 201 39),
            rgb(255 255 255)
        );
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-transform: capitalize;
        cursor: pointer;
    }

    .powered-by{
        display: flex;
        align-items: flex-end;
        gap: 5px;

        span {
            font-size: 12px;

            @media (max-width: 576px) {
                font-size: 10px;
            }
        }

        img {
            cursor: pointer;

            @media (max-width: 576px) {
                width: 70px;
            }
        }
    }
`

function Header() {
    const navigate = useNavigate();
    return (
        <HeaderWrapper>
            <div
                className="logo"
                onClick={() => navigate('/')}
            >
                FuturePath AI
            </div>

            <div className="powered-by">
                <span>Powered By</span>
                <img
                    src={OpenXcell}
                    alt="OpenXcell"
                    width={'100px'}
                    onClick={() => window.open(URL_OPENXCELL)}
                />
            </div>
        </HeaderWrapper>
    )
}

export default memo(Header)
