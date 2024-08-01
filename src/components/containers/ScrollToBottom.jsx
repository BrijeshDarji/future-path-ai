import styled from "styled-components";
import { DownArrowIcon } from "../../assets/constants/Constant";
import { useEffect, useState } from "react";

const ScrollTopTopWrapper = styled.div`
  position: fixed;
  bottom: 90px;
  z-index: 1000;
  right: 20px;
  background-color: #939393;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  display: ${(props) => (props?.$visible ? "block" : "none")};
  left: 50%;
  transform: translate(-50%, -50%);

  .arrow {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 50%;
    transition: 0.5s all;
    padding: 10px;

    &:hover {
      transform: translate(-50%, -40%);
      cursor: pointer;
    }
  }
`;

const ScrollToTop = () => {
  const [visibleIcon, setIconVisibility] = useState(false);
  const performAction = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    function handleScrollToElement() {
      if (window.innerHeight + window.pageYOffset >= document.body.scrollHeight)
        return setIconVisibility(false);
      setIconVisibility(true);
    }

    window.addEventListener("resize", handleScrollToElement);
    window.addEventListener("scroll", handleScrollToElement);
    return () => {
      window.removeEventListener("scroll", handleScrollToElement);
      window.removeEventListener("resize", handleScrollToElement);
    };
  }, []);

  return (
    <ScrollTopTopWrapper $visible={visibleIcon}>
      <img
        src={DownArrowIcon}
        className="arrow"
        alt="scroll-to-bottom-icon"
        onClick={() => performAction()}
      />
    </ScrollTopTopWrapper>
  );
};

export default ScrollToTop;
