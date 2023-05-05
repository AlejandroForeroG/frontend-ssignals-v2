//importaciones 📁
//modulos
import io from "socket.io-client";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
//componentes
import { editUser } from "../../store/slices/user";
import { setInitSignals } from "../../store/slices/Signals";
import { SignalInicio } from "./inicio/SignalInicio";
import { TomaSignals } from "./TomaSignals";
//metodos de api
import { getUser } from "../../store/slices/user";
import { useEditUserMutation } from "../../store/services/userApi";

//TODO: trabajas con sockets

// const socket = io("http://192.168.10.12:3100");

//funcion principal 📑
export function Home() {
  //estado local
  const dispatch = useDispatch();
  
  const actualUser = useSelector((state) => state.user);
  
  const [editUserDB, { error, isLoading }] = useEditUserMutation();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  const [isInit, setIsInit] = useState(actualUser.isActive);

  if (isLoading)
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h1>Cargando..</h1>
      </div>
    );
  if (error) return <p>Oh no, there was an error</p>;

  const toggleInit = async () => {
    setIsInit(!isInit);
    const estado = isInit;
    dispatch(editUser({ ...actualUser, isActive: estado }));
    await dispatch(setInitSignals(!isInit));
    await editUserDB({ ...actualUser, isActive: estado });
  };

  //retorno del componente
  return (
    <Container>
      <div>
        {isInit ? (
          <div className="contenedor-bg">
            <SignalInicio setIsInit={setIsInit} toggleInit={toggleInit} />
          </div>
        ) : null}
      </div>
      <div>
        {!isInit ? (
          <div className="contenedor">
            <TomaSignals isInit={isInit} toggleInit={toggleInit} />
          </div>
        ) : null}
      </div>
      {/* componente de señales */}
      {/* <div className={!isInit ? `contenedor` : `off`}>
        <TomaSignals isInit={isInit} toggleInit={toggleInit} />
      </div> */}
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
