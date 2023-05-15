import styled from "styled-components";
import { useSelector } from "react-redux";
import { Grapher } from "./Grapher";
import SignalController from "../../controllers/SignalController";

export function Charts() {
  const signals = useSelector((state) => state.signals);

  return (
    <Container>
      <div className="signalsContainer">
        {signals.slice(0, 6).map((signal, index) => (
          <div className="margin" key={index}>
            <div className="container-text">
              <p>{signal.name}</p>
              {/* <p>Tm: {signal.samplingTime} S</p> */}
              <div></div>
            </div>
            <div className="canvasContainer">
              <Grapher signal={signal} />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .signalsContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 40px;
    .margin {
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: center;
      background-color: #fcfcfc;

      margin: 0 15px 10px 0;
      padding: 10px 0;
      border-radius: 1rem;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      
      .container-text {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-top: 10px;
        /* margin-left: 20px; */
        text-align: center;

        p {
          font-size: 1.2rem;
          /* margin-left: 20px; */
          font-weight: 500;
          /* box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; */
          border-radius: 1rem;
          padding: 0px 0px;
        }
      }
      .canvasContainer {
        margin: 0px 12px 12px 12px;
        width: 500px;
        height: 315px;
      }
    }
  }
`;
