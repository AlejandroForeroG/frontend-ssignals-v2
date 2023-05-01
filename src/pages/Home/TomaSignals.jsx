import styled from "styled-components";
import { v } from "../../styles/Variables";
export function TomaSignals({isInit}) {
  return (
    <Container>
      <div className="Iniciar-contenedor">
        <div className="img-contenedor">
          <img src="/profile1.png" alt="imagen de usuario" />
          <div className="datosPaciente">
            <h3>Nombre Paciente</h3>
            <div className="datosPaciente">
              <p>22 años</p>
              <p>172 cm</p>
              <p>8 kg</p>
            </div>
          </div>
        </div>
      </div>
      <div className="boton-contenedor"></div>
    </Container>
  );
}
const Container = styled.div`
  .Iniciar-contenedor {
    margin-top: ${v.smSpacing};
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px,
      rgba(17, 17, 26, 0.05) 0px 8px 32px;
    border-radius: 25px;
    padding: ${v.lgSpacing};
    .img-contenedor {
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 100px;
        border-radius: 50%;
        margin-right: ${v.smSpacing};
        cursor: pointer;
      }
    }
  }
`;
