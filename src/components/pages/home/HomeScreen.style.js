import styled from "styled-components";

const LandingWrapper = styled.div`
  width: 100%;
  height: 100%;
  .main-bg-image {
    width: 100%;
    max-width: 1920px;
    height: 100%;
    position: absolute;
    top: -250px;
    left: 0;
    right: 0;
    margin: auto;
    z-index: -1;
  }

  .inner-container {
    max-width: 1200px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0 50px;
    @media (max-width: 768px) {
      padding: 0 20px;
    }
  }
  header {
    width: 100%;
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo-container {
      display: flex;
      align-items: center;
      img {
        margin-right: 10px;
      }
      .logo-text {
        font-size: 24px;
        font-weight: 900;
        background: -webkit-linear-gradient(
          225deg,
          rgb(255 201 39),
          rgb(255 255 255)
        );
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-transform: capitalize;
      }
    }
    @media (max-width: 768px) {
      button {
        display: none;
      }
    }
  }
  .main-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    height: calc(100% - 100px);
    .left-heading {
      max-width: 450px;
      text-align: left;
      .title {
        font-size: 38px;
        line-height: normal;
        font-weight: 600;
        .gradient-active {
          background: -webkit-linear-gradient(
            225deg,
            rgb(85, 22, 251),
            rgb(225, 159, 255)
          );
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-transform: capitalize;
        }
      }
      .content {
        font-size: 16px;
        line-height: normal;
        font-weight: 400;
        max-width: 400px;
        margin-bottom: 50px;
      }
      @media (max-width: 768px) {
        .title {
          font-size: 32px;
        }
        button {
          width: 100%;
        }
      }
    }
    .right-heading {
    }
    @media (max-width: 991px) {
      margin-top: 10px;
      flex-direction: column-reverse;
      justify-content: flex-end;
      gap: 100px;
    }
  }
`;

export default LandingWrapper;
