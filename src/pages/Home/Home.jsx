//importaciones 📁

import ReactLoading from "react-loading";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Slides } from "./Slides/Slides";
import { TomaSignals } from "./TomaSignals";
import { setInitSignals } from "../../store/slices/Signals";
import { editUser } from "../../store/slices/user";
import { useGetUserData } from "../../hooks/useGetUser";
import { useEditUserMutation } from "../../store/services/userApi";
import { createContext, useState } from "react";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { ContextProvider } from "../../context/contextProvider";
export const appContext = createContext();

export function Home() {
  const [socket, setSocket] = useState(null);
    useEffect(() => {
      setSocket(io("http://192.168.10.14:3100"));
    }, []);
  const dispatch = useDispatch();

  const [editUserDB, { error, isLoading, }] = useEditUserMutation();
  const actualUser = useSelector((state) => state.user);
  const signals = useSelector((state) => state.signals.slice());

  const { data: user, isLoadingDB } = useGetUserData();
  const [state, setState] = useState(null);

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

  if (error) return <p>Oh no, hubo un error recarga la pagina ☹</p>;



  //funcion start finish
  let btnstate;
  const offConnection = async () => {
    setState(2);
    const estado = false;
    btnstate = 0;
    socket.emit("btninit", btnstate);
    dispatch(editUser({ ...actualUser, isactive: estado }));
    await dispatch(setInitSignals(estado));
    await editUserDB({ ...actualUser, isactive: estado });
  };

  const onWait = async () => {
    const estado = true;
    dispatch(editUser({ ...actualUser, isactive: estado }));
    await dispatch(setInitSignals(estado));
    await editUserDB({ ...actualUser, isactive: estado });
    socket.emit("info", { actualUser, signals });
  };

  const onStart = async () => {
    setState(1);
    btnstate = 1;
    socket.emit("btninit", btnstate);
  };

  const onRestart = async () => {
    btnstate = 0;
    socket.emit("btninit", btnstate);
    setState(0);
  };

  return (
    <Container>
      <ContextProvider state = {state} setState={setState} socket={socket}>
        
          <div>
            {!actualUser.isactive && (
              <div className="contenedor-bg">
                <Slides onWait={onWait} />
              </div>
            )}
          </div>

          <div>
            {actualUser.isactive && (
              <div className="contenedor">
                <TomaSignals
                  offConnection={offConnection}
                  onRestart={onRestart}
                  onStart={onStart}
                  // socket={socket}
                />
              </div>
            )}
          </div>
      </ContextProvider>
    </Container>
  );
}

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
