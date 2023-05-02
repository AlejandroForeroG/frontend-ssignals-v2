import styled from "styled-components";
import { ButtonP } from "../../../components/elements/ButtonP";

export function ListaSignals({handleSlideBack,handleSlide}) {
 return (
   <Container>
     <div className="contenedor-texto">
       <h1 className="primero">Elige las señales y sus tiempos ⏱</h1>
     </div>
     <div className="buttons">
       <ButtonP
         text="Atras"
         color="secondary"
         handle={handleSlideBack}
       ></ButtonP>
       <ButtonP text="Siguiente" color="primary" handle={handleSlide}></ButtonP>
     </div>
   </Container>
 );
}
const Container = styled.div``;