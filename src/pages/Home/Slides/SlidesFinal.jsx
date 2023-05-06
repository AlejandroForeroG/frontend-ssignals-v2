import styled from "styled-components";
import { useSelector } from "react-redux";
import { ButtonP } from "../../../components/elements/ButtonP";

export function SlidesFinal({ handleSlideBack, toggleInit }) {
  const actualUser = useSelector((state) => state.user);
  const signals = useSelector((state) => state.signals.slice(0, 5));

  return (
    <Container>
      <div className="contenedor-texto">
        <h1 className="primero" id="primero">
          Revisa la informacion antes de iniciar 🎯
        </h1>

        <div className="contenedor-final">
          <div className="contenedor-info-final">
            <h2>Usuario</h2>
            <div className="contenedor-imagen-final">
              <img src={`${actualUser.pp}`} alt="" />
            </div>
            <div className="info"></div>
            <p className="usuario">{`${actualUser.name}`}</p>
            <p>{`id: ${actualUser.id}`}</p>
            <p>{`Edad: ${actualUser.age} años`}</p>
            <p>{`Altura: ${actualUser.height}cm`}</p>
            <p>{`Peso: ${actualUser.weight} kg`}</p>
          </div>
          <div className="contenedorSignals">
            <h2>Tiempos</h2>
            <div className="tiempos">
              <ul className="nombre">
                {signals.map((signal) => (
                  <li key={signal.id} className={signal.name}>
                    {signal.name}
                  </li>
                ))}
              </ul>
              <div className="valores-tiempos">
                {signals.map((signal) => (
                  <p>{signal.samplingTime} s</p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="parrafoAbajo">
          <p>Asegurate que todo este correcto no podras retroceder</p>
          <p>a menos que termines el muestreo.</p>
        </div>
        <div className="buttons" id="buttons">
          <ButtonP
            text="Atras"
            color="secondary"
            handle={handleSlideBack}
          ></ButtonP>
          <ButtonP
            text="Todo correcto iniciemos!! "
            color="primary"
            handle={toggleInit}
          ></ButtonP>
        </div>
      </div>
    </Container>
  );
}

//estilos
const Container = styled.div`
  #primero {
    margin-top: 50px;
  }
  .contenedor-final {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px;

    .contenedor-info-final {
      .contenedor-imagen-final {
        margin-top: 10px;
        img {
          width: 100px;
          border-radius: 50%;
        }
      }
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

      border-radius: 1rem;
      width: 200px;
      padding: 10px;
      .usuario {
        font-size: 1.3rem;
        font-weight: bold;
      }
    }
    .contenedorSignals {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      text-align: left;
      padding: 10px;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      width: 300px;
      height: 300px;
      margin-left: 20px;
      border-radius: 1rem;
      h2 {
        margin-bottom: 20px;
      }
      .tiempos {
        display: flex;
      }
      ul {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: stretch;
        list-style: none;
        margin-bottom: 70px;
        margin-right: 20px;
        li:before {
          content: "📌";
          margin-right: 10px;
        }
      }
    }
  }
  .parrafoAbajo {
    margin-bottom: 20px;
  }
  #buttons {
    margin-bottom: 20px;
  }
`;
