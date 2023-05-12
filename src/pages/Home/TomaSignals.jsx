import styled from "styled-components";
import { v } from "../../styles/Variables";
import { useSelector } from "react-redux";
import { BiPowerOff } from "react-icons/bi";
import { BsFillPlayFill, BsStopFill} from "react-icons/bs";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Charts } from "../../components/Signals/Charts";
import { useContext } from "react";
import { appContext } from "./Home";
import { useState } from "react";
export function TomaSignals({ offConnection,socket,onRestart,onStart }) {
  const actualUser = useSelector((state) => state.user);
  const [pressed, setPressed] = useState(true);
 

   const clickbutton = () => {
     setPressed(!pressed);
     if (pressed) {
       onStart();
     } else {
       onRestart();
     }
   };

  return (
    <Container>
      <div className="header-inicio">
        <div className="Iniciar-contenedor">
          <div className="img-contenedor">
            <img src={actualUser.pp} alt="imagen de usuario" />
            <div className="datosPaciente">
              <h3>{actualUser.name}</h3>
              <div className="datosPaciente">
                <p>{actualUser.age} años</p>
                <p>{actualUser.height} cm</p>
                <p>{actualUser.weight} kg</p>
              </div>
            </div>
          </div>
          <div className="boton-contenedor">
            <button
              className={pressed ? "boton offe" : "boton offe pressedoff"}
              onClick={offConnection}
              disabled={!pressed}
            >
              <div className="icon">
                <BiPowerOff />
              </div>
            </button>
          </div>
        </div>
        <div className="Iniciar-contenedor" id="contenedor-pressed">
          <div className="boton-contenedor">
            <button
              className={pressed ? "boton" : "boton pressed"}
              onClick={clickbutton}
              id="restart"
            >
              <div className="icon">
                {pressed ? <BsFillPlayFill /> : <BsStopFill />}
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="signalsContainer">
        <Charts />
      </div>
    </Container>
  );
}


const Container = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;

  justify-content: center;
  background: #ecf0ff;
  .header-inicio {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 100px;
    .Iniciar-contenedor {
      background-color: #fcfcfc;
      min-width: 50px;
      min-height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
      border-radius: 70px;
      padding: 10px 8px;
      font-size: 80%;
      .img-contenedor {
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 80px;
          border-radius: 50%;
          margin-right: ${v.smSpacing};
          cursor: pointer;
        }
      }
      @media (max-width: 750px) {
        width: 200px;
        background-color: #36d344;
      }
      .boton {
        font-size: 100%;
        line-height: 1.15;
        margin: 12px 15px 15px 30px;
        outline: none;
        padding: 5px 6px;
        border-radius: 50%;
        border-width: 0;
        color: #fff;
        cursor: pointer;
        background-color: #405cf5;
        box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset,
          rgba(50, 50, 93, 0.1) 0 2px 5px 0, rgba(0, 0, 0, 0.07) 0 1px 1px 0;
        :active {
          background-color: rgba(51, 214, 146, 1);
        }
        .icon {
          svg {
            font-size: 2rem;
          }
        }
      }
      .pressed {
        background-color: rgba(51, 214, 146, 1);
        box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
          rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
        color: #f3f3f3;
      }
      .offe {
        background-color: #f14864;
      }
      .pressedoff {
        background-color: #d2475e;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
          rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
        color: #f3f3f3;
        cursor: not-allowed;
      }
      #restart {
        margin: 10px;
      }
    }
    #contenedor-pressed {
      margin-left: 10px;
      border-radius: 50%;
      padding: 10px 10px;
      min-width: 50px;
    }
  }
  .signalsContainer {
  }
`;
