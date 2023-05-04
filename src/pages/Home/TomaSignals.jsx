import styled from "styled-components";
import { v } from "../../styles/Variables";
import { useSelector } from "react-redux";
import { BiPowerOff } from "react-icons/bi";
import { getUser } from "../../store/thunks";
import { useEffect } from "react";

export function TomaSignals({ isInit, toggleInit }) {
  const actualUser = useSelector((state) => state.user);
  const signals = useSelector((state) => state.signals.slice(0, 5));

  useEffect(() => {
    getUser();
  }, [actualUser]);


  return (
    <Container>
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
          <button className="boton" onClick={toggleInit}>
            <div className="icon">
              <BiPowerOff />
            </div>
          </button>
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .Iniciar-contenedor {
    width: 20%;
    margin-top: ${v.smSpacing};
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px,
      rgba(17, 17, 26, 0.05) 0px 8px 32px;
    border-radius: 70px;
    padding: ${v.lgSpacing};
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
    .boton {
      font-size: 100%;
      line-height: 1.15;
      margin: 12px 20px 10px 0;
      outline: none;
      padding: 5px 6px;
      border-radius: 50%;
      border-width: 0;
      color: #fff;
      cursor: pointer;
      background-color: #f5b040;
      box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset,
        rgba(50, 50, 93, 0.1) 0 2px 5px 0, rgba(0, 0, 0, 0.07) 0 1px 1px 0;
      :active {
        background-color: #c19d3a;
      }
      .icon {
        svg {
          font-size: 2rem;
        }
      }
    }
    @media (max-width: 750px) {
      width: 200px;
      background-color: #36d344;
    }
  }
`;
