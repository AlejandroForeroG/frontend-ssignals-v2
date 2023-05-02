import io from "socket.io-client";
import styled from "styled-components";
import { useState} from "react";
import { useSelector } from "react-redux";
import { SignalInicio } from "./SignalInicio";
import { TomaSignals } from "./TomaSignals";

//TODO: trabajas con sockets

// const socket = io("http://192.168.10.12:3100");

//funciones de cambio de estado
export function Home() {
  const [isInit, setIsInit] = useState(true);
  const toggleInit = () => {
    setIsInit(!isInit);
  };


//retorno del componente
  return (
    <Container>
      {/* cmponente de bienvenida inicial */}
      <div className={!isInit ? `off` : `contenedor`}>
        <div className="contenedor-bg">
          <SignalInicio setIsInit={setIsInit} toggleInit={toggleInit} />
        </div>
      </div>
      {/* componente de señales */}
      <div className={isInit ? `off` : `contenedor`}>
        <TomaSignals isInit={isInit} />
      </div>
    </Container>
  );
}

//#beginregion estilos
const Container = styled.div`
  height: 98vh;
  .contenedor-bg {
    width: 95vw;
    height: 100vh;
    position: absolute;
    top: 0;
    z-index: 5;
    background: rgb(176, 245, 92);
    background: radial-gradient(
      circle,
      rgba(176, 245, 92, 0.41360294117647056) 0%,
      rgba(51, 214, 146, 0.5284488795518207) 41%,
      rgba(50, 148, 246, 1) 100%
    );
  }
  .contenedor {
    opacity: 1;
    transition: opacity 1s ease-in-out;
  }
  .off {
    opacity: 0;
  }
`;
//#endregion
