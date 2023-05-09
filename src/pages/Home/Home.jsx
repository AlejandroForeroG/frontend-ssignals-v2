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
import { useState } from "react";
import { io } from "socket.io-client";
import { useEffect } from "react";

export function Home() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://192.168.10.24:3100"));
   
  }, []);

  const dispatch = useDispatch();

  const [editUserDB, { error, isLoading }] = useEditUserMutation();
  const actualUser = useSelector((state) => state.user);
  const signals = useSelector((state) => state.signals.slice());

  const { data: user, isLoadingDB } = useGetUserData();
  const [pressed, setPressed] = useState(true);

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

  const clickbutton = () => {
    setPressed(!pressed);
    if (pressed) {
      state = 1;
    } else {
      state = 0;
    }
    socket.emit("btninit", state);
  };

  //funcion start finish
  let state;
  const offConnection = async () => {
    const estado = false;
    state = 0;
    socket.emit("btninit", state);
    dispatch(editUser({ ...actualUser, isactive: estado }));
    await dispatch(setInitSignals(estado));
    await editUserDB({ ...actualUser, isactive: estado });
  };

  const onConnection = async () => {
    const estado = true;
    state = 1;
    socket.emit("btninit", state);
    dispatch(editUser({ ...actualUser, isactive: estado }));
    await dispatch(setInitSignals(estado));
    await editUserDB({ ...actualUser, isactive: estado });

    socket.emit("info", { actualUser, signals });
  };

  return (
    <Container>
      <div className="container-prueba">
        <button
          className={pressed ? "clicko unpress" : "clicko press"}
          onClick={clickbutton}
        >
          🤠
        </button>
      </div>

      <div>
        {!actualUser.isactive && (
          <div className="contenedor-bg">
            <Slides onConnection={onConnection} />
          </div>
        )}
      </div>
      <div>
        {actualUser.isactive && (
          <div className="contenedor">
            <TomaSignals offConnection={offConnection} socket={socket} />
          </div>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  //prueba
  .container-prueba {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
  .clicko {
    position: absolute;
    top: 10px;
    left: 200px;
    z-index: 100;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      background-color: #d4e51d;
    }
  }
  .unpress {
    background-color: #c6282b;
  }
  .press {
    background-color: #d4e51d;
  }

  //prueba
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
