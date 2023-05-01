import styled from "styled-components";
import { TbHealthRecognition } from "react-icons/tb";
import { v } from "../../styles/Variables";
import { useState } from "react";
import { ButtonP } from "../../components/elements/ButtonP";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useGetUsersQuery } from "../../services/apiSlice";
import { ListaUsers } from "./listaUsers";

export function SignalInicio({ toggleInit }) {
  //TODO CAMBIAR EL !1 por un 0
  const [slide, setSlide] = useState(1);
  const { data: users, error, isLoading } = useGetUsersQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Oh no, there was an error</p>;
  console.log(users);

  const handleSlide = () => {
    setSlide(slide + 1);
    console.log(slide);
  };
  const handleSlideBack = () => {
    setSlide(slide - 1);
    console.log(slide);
  };

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
              <ListaUsers
                slide={slide}
                handleSlide={handleSlide}
                handleSlideBack={handleSlideBack}
                users={users}
              />
            </div>
            <div className={slide === 2 ? "contenedor" : "off"}>
              <div className="contenedor-texto">
                <h1 className="primero">Elige las señales y sus tiempos ⏱</h1>
              </div>
              <div className="buttons">
                <ButtonP
                  text="Atras"
                  color="secondary"
                  handle={handleSlideBack}
                ></ButtonP>
                <ButtonP
                  text="Siguiente"
                  color="primary"
                  handle={handleSlide}
                ></ButtonP>
              </div>

            
            </div>
            <div className={slide === 3 ? "contenedor" : "off"}>
              <div className="contenedor-texto">
                <h1 className="primero">
                  Revisa la informacion antes de iniciar
                </h1>
                <p>Asegurate que sea el correcto no podras retroceder.</p>
                <div className="buttons">
                  <ButtonP
                    text="Atras"
                    color="secondary"
                    handle={handleSlideBack}
                  ></ButtonP>
                  <ButtonP
                    text="Siguiente"
                    color="primary"
                    handle={toggleInit}
                  ></ButtonP>
                </div>
                <div className="preInicio"></div>
              </div>
              <div></div>
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
