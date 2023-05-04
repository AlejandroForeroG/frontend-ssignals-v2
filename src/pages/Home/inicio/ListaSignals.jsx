import styled from "styled-components";
import { useState } from "react";
import { setTime } from "../../../store/slices/Signals";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ButtonP } from "../../../components/elements/ButtonP";
import { v } from "../../../styles/Variables";

export function ListaSignals({ handleSlideBack, handleSlide }) {
  const initialValues = [];
  for (let i = 1; i <= 5; i++) {
    initialValues.push({
      id: i,
      samplingTime: "1",
    });
  }
  const signals = useSelector((state) => state.signals.slice(0, 5));
  const dispatch = useDispatch();
  const opciones = [0.1, 0.5, 1, 5, 10, 30, 60, 120];
  const [selectedValues, setSelectedValues] = useState(initialValues);

  function handleSelectChange(event) {
    const { id, value } = event.target; // Obtén el ID y el valor del select que cambió
    const selectedValue = {
      id: parseInt(id),
      samplingTime: value,
    };
    setSelectedValues((prevValues) =>
      prevValues.map((prevValues) =>
        prevValues.id === selectedValue.id ? selectedValue : prevValues
      )
    ); // Actualiza los valores seleccionados
  }

  function handleSubmit(event) {
    event.preventDefault(); // Evita que se recargue la página al enviar el formulario
    dispatch(setTime(selectedValues)); // Llama a la función setTiempo con los valores seleccionados
    handleSlide();
  }

  return (
    <Container>
      <div className="contenedor-texto">
        <h1 className="primero">Elige las señales y sus tiempos ⏱</h1>
        <p>Las señales estan en segundos</p>
      </div>

      <div className="contenedor-formulario">
        <div className="signals-text">
          {signals.map((signal) => (
            <label htmlFor={signal.id} className="form-label" key={signal.id}>
              📌 {signal.name}
            </label>
          ))}
        </div>
        <form id="myForm2" onSubmit={handleSubmit}>
          {signals.map((signal) => (
            <div className="signals-form" key={signal.id}>
              <select
                id={signal.id}
                className="form-option"
                onChange={handleSelectChange}
                defaultValue={1}
              >
                {opciones.map((opcion) => (
                  <option value={opcion} key={opcion}>
                    {opcion}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </form>
      </div>

      <p>La señal de ECG tiene un tiempo determinado para que funcione bien</p>
      <p>Por ende no se puede cambiar</p>
      <div className="buttons">
        <ButtonP
          text="Atras"
          color="secondary"
          handle={handleSlideBack}
        ></ButtonP>
        <ButtonP
          text="Siguiente"
          color="primary"
          type="submit"
          form="myForm2"
        ></ButtonP>
      </div>
    </Container>
  );
}
const Container = styled.div`
  .contenedor-formulario {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display: flex;
    padding: 30px;
    justify-content: center;
    align-items: center;
    margin: 25px;
    border-radius: 1rem;
    .signals-text {
      display: flex;
      flex-direction: column;
      text-align: left;
      margin-bottom: 10px;
      .form-label {
        text-align: left;
        margin-bottom: 5px;
      }
    }
    #myForm2 {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: left;
      margin-left: 20px;
    }
    .signals-form {
      .form-option {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        border-radius: 0.5rem;
        background-color: #d3f0fd;
        border: 1px solid #d3f0fd;
        margin-bottom: 5px;
        padding: 2px;
        width: 100px;
        outline: none;
        cursor: pointer;
        :hover {
          border: 1px solid ${v.primaryColor};
          outline: none;
        }
      }
    }
    .segundos {
      margin: 0 10px 10px 15px;
    }
  }
`;
