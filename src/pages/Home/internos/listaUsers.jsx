//componente el cual se encarga de setear el usuario al cual se le van a tomar las medidas
//imports
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editUser, editUserActive } from "../../../features/user";

import { ButtonP } from "../../../components/elements/ButtonP";
import { v } from "../../../styles/Variables";

//funcion princiapal
export function ListaUsers({ handleSlide, handleSlideBack, users }) {
  //manejador de error si el id no llega  a estar en la base de datos
  //hooks
  const [error, setError] = useState(false);
  const dispatch = useDispatch();


  //funciones
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = e.target.paciente.value.trim();
    const selectedPatient = users.find(
      (patient) => patient.id === parseInt(id)
    );

    if (selectedPatient) {
      // Paciente encontrado, realizar acción
      console.log(selectedPatient);
      setError(false);
      dispatch(editUser(selectedPatient));
      dispatch(editUserActive());
      handleSlide();
    } else {
      // Paciente no encontrado, mostrar mensaje de error
      setError(true);
    }
  };

  //return del componente
  return (
    <Container>
      <div className="contenedor-texto">
        <h1 className="primero">
          Elige el paciente por su ID 🩺{" "}
        </h1>
      </div>

      <div className="contenedor-lista">
        <form id="myForm" onSubmit={handleSubmit}>
          <input
            name="paciente"
            type="search"
            list="nombres"
            className="lista"
            required
          />
          <datalist id="nombres">
            {users.map((user) => (
              <option value={`${user.id}`} key={user.id} />
            ))}
          </datalist>
        </form>
        {error && <p>Uy, no se encontro el paciente 😕, ingresa denuevo</p>}

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
            form="myForm"
          ></ButtonP>
        </div>
      </div>
    </Container>
  );
}

//#region styles
const Container = styled.div`
  #listas {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
  }

  .contenedor-texto {
    padding: 10px;
  }
  p {
    padding: 10px;
    color: #e13333;
    font-weight: bold;
  }

  .lista {
    background-color: #d3f0fd;
    border: 1px solid #d3f0fd;

    box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px;

    width: 20rem;
    height: 2rem;
    border-radius: 45px;
    padding: 0 1rem;
  }
  .lista:focus {
    border: 1px solid ${v.primaryColor};
    outline: none;
    cursor: pointer;
  }

  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
`;
//#endregion
