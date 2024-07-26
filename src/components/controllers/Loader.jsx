import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

import { Logo } from '../../assets/constants/Constant';

const LoaderWrapper = styled.div`
    padding: 10px 15px;
    display: flex;
    gap: 20px;
    align-items: flex-start;
    width: 100%;
    max-width: 700px;

    > div {
        width: 100%;
    }
`

function Loader() {
    return (
        <LoaderWrapper>
            <img
                src={Logo}
                alt="logo"
                width={'25px'}
            />

            <div style={{ marginTop: "-5px" }}>
                <Skeleton
                    baseColor={'#171c24'}
                    highlightColor={'#7423cd'}
                    height={'30px'}
                    borderRadius={'10px'}
                />

                <Skeleton
                    baseColor={'#171c24'}
                    highlightColor={'#7423cd'}
                    height={'20px'}
                    width={'70%'}
                    style={{ marginTop: "7px" }}
                    borderRadius={'7px'}
                />

                <Skeleton
                    baseColor={'#171c24'}
                    highlightColor={'#7423cd'}
                    height={'20px'}
                    width={'60%'}
                    style={{ marginTop: "5px" }}
                    borderRadius={'7px'}
                />
            </div>
        </LoaderWrapper>
    )
}

export default Loader;