import styled from "styled-components";

const ChartWrapper = styled.div`
  width: 100%;
  height: 100%;

  .chart-container {
    padding-top: 20px;
    width: 600px;
    height: 400px;

    @media (max-width: 991px) {
      margin-top: 10px;
      flex-direction: column-reverse;
      justify-content: flex-end;
      gap: 100px;
    }
  }
`;

export default ChartWrapper;
