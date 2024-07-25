import { memo } from "react"
import styled from "styled-components";

import { RedHeart } from "../../assets/constants/Constant";

const FooterWrapper = styled.footer`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 30px;
    font-size: 14px;
    width: 100%;
    background-image: radial-gradient(rgba(0, 0, 0, 0) 1px, var(--background) 1px);
    background-size: 4px 4px;
    backdrop-filter: blur(6px);
    z-index: 999;

    img{
        margin: 0 7px;
        animation: pulse 1s infinite;
    }

    strong{
        margin-left: 5px;
    }
`

function Footer() {
    return (
        <FooterWrapper>
            Made with
            <img
                src={RedHeart}
                alt="RedHeart"
                width={'15px'}
            />
            by
            <i><strong>NextGen Navigators</strong></i>
        </FooterWrapper>
    )
}

export default memo(Footer)
