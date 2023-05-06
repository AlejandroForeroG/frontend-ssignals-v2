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
import { Slides } from "./Slides/Slides";
import { TomaSignals } from "./TomaSignals";
import { useGetUserData } from "../../hooks/useGetUser";
//metodos de api

import { useEditUserMutation } from "../../store/services/userApi";
import ReactLoading from "react-loading";
//TODO: trabajas con sockets

// const socket = io("http://192.168.10.12:3100");

//funcion principal 📑
export function Home() {
  //estado local
  const dispatch = useDispatch();

  
  const [editUserDB, { error, isLoading }] = useEditUserMutation();
  const actualUser = useSelector((state) => state.user);
  const { data: user, isLoadingDB, isSuccess } = useGetUserData();
  const [isSampling, setIsSampling] = useState(); 
  

  if (isLoadingDB || isLoading || !user || !actualUser)
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <ReactLoading
          type={"spin"}
          color={"#405cf5"}
          height={200}
          width={100}
        />
      </div>
    );
    
    if (error) return <p>Oh no, there was an error</p>;
     

  const toggleInit = async () => {
    
    const estado = actualUser.isactive ? false : true;
    dispatch(editUser({ ...actualUser, isactive: estado }));
    await dispatch(setInitSignals(estado));
    await editUserDB({ ...actualUser, isactive: estado });
  };

  //retorno del componente
   
   
    return (
      <Container>
        <div>
          {!actualUser.isactive ? (
            <div className="contenedor-bg">
              <Slides toggleInit={toggleInit} />
            </div>
          ) : null}
        </div>
        <div>
          {actualUser.isactive ? (
            <div className="contenedor">
             
              <TomaSignals toggleInit={toggleInit} />
            </div>
          ) : null}
        </div>
      </Container>
    );
}

//#beginregion estilos
const Container = styled.div`
  height: 100%;
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
