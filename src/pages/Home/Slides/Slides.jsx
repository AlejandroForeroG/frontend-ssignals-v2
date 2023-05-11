//import de librerias externas
import styled from "styled-components";
import { useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { TbHealthRecognition } from "react-icons/tb";
//import de componentes internos
import { SlidesUsers } from "./SlidesUser";
import { SlidesSignals } from "./SlidesSignals";
import { SlidesFinal } from "./SlidesFinal";
import { ButtonP } from "../../../components/elements/ButtonP";
import { useGetUsersQuery } from "../../../store/services/userApi";
import { v } from "../../../styles/Variables";

//funcion principal
export function Slides({ onWait }) {

  //funciones de cambio de estado
  const [slide, setSlide] = useState(0);

  //funcion para compobar que el elemento este en la basee de datos
  const { data: users, error, isLoading } = useGetUsersQuery();

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

  //manejo del corrimiento del slide
  const handleSlide = () => {
    setSlide(slide + 1);
  };
  const handleSlideBack = () => {
    setSlide(slide - 1);
  };


  //retorno del componente
  return (
    <Container>
      <SwitchTransition>
        <CSSTransition
          classNames="fade"
          key={slide}
          addEndListener={(node, done) =>
            node.addEventListener("transitionend", done, false)
          }
        >
          <div className="contenedor-primario">
            <div className={slide === 0 ? "contenedor" : "off"}>
              <div className="contenedorimg">
                <TbHealthRecognition />
              </div>
              <div className="contenedor-texto">
                <h1 className="primero">Bienvenido 👋</h1>
                <h2>Este es el sistema de recoleccion de señales</h2>
                <p>Antes de iniciar necesitamos que llenes algunos campos</p>
                <div className="preInicio"></div>
              </div>
              <div>
                <ButtonP
                  text="Adelante!"
                  color="primary"
                  handle={handleSlide}
                ></ButtonP>
              </div>
            </div>

            <div className={slide === 1 ? "contenedor" : "off"}>
              <SlidesUsers
                slide={slide}
                handleSlide={handleSlide}
                handleSlideBack={handleSlideBack}
                users={users}
              />
            </div>

            <div className={slide === 2 ? "contenedor" : "off"}>
              <SlidesSignals
                handleSlideBack={handleSlideBack}
                handleSlide={handleSlide}
              />
            </div>

            <div className={slide === 3 ? "contenedor" : "off"}>
              <SlidesFinal
                handleSlideBack={handleSlideBack}
                onWait={onWait}
              />
            </div>
          </div>
        </CSSTransition>
      </SwitchTransition>
    </Container>
  );
}

const Container = styled.div`
  .contenedor-primario {
    width: 95vw;
    height: 100vh;
    position: absolute;
    top: 0;
    z-index: 5;

    .off {
      display: none;
    }
    .contenedor {
      margin-left: 100px;
      text-align: center;
      border-radius: 1rem;
      padding: 1rem;
      background-color: #fcfcfc;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: space-evenly;
      width: 50rem;
      min-height: 25rem;
      position: absolute;
      top: 50%;
      left: 45%;
      transform: translate(-50%, -50%);
      z-index: 10;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
      border-radius: 25px;
      .contenedorimg {
        font-size: 7rem;
        color: ${v.secondaryColor};

        margin-bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .contenedo-texto {
        margin-top: 0;
      }

      .buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
      }
    }
  }

  .fade-enter {
    opacity: 0;
    transform: translateY(100%);
  }
  .fade-enter-active {
    opacity: 1;
    transform: translateY(0%);
  }
  .fade-exit {
    opacity: 1;
    transform: translateY(0%);
  }
  .fade-exit-active {
    opacity: 0;
    transform: translateY(-100%);
  }
  .fade-enter-active,
  .fade-exit-active {
    transition: opacity 500ms, transform 500ms;
  }
`;
