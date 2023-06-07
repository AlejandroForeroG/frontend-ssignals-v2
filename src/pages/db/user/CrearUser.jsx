import styled from "styled-components";
import { BsCheckCircle } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useState } from "react";
import { useCreateUserMutation } from "../../../store/services/userApi";

export function CrearUser({ setState, passData }) {
  const edades = Array.from({ length: 120 }, (_, i) => i + 1); // Genera una matriz de edades del 1 al 120
  const [createUser, { isLoading, error }] = useCreateUserMutation();

  const [formData, setFormData] = useState({
    name: "",
    pp: "",
    height: "",
    weight: "",
    age: "",
  });

  const handleCancel = (e) => {
    e.preventDefault();
    setState("base");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    await createUser(formData);
    setState("base");
    passData(formData);
  };
  return (
    <Container>
      <div className="contenedor-creacion">
        <h1>Crear usuario</h1>
        <div className="form-crear">
          <form>
            <div className="izquierda">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <label htmlFor="pp">link imagen</label>
              <input
                type="pp"
                name="pp"
                id="pp"
                onChange={(e) =>
                  setFormData({ ...formData, pp: e.target.value })
                }
              />
            </div>
            <div className="derecha">
              <label htmlFor="height">Altura</label>
              <input
                type="number"
                name="height"
                id="height"
                required
                onChange={(e) =>
                  setFormData({ ...formData, height: e.target.value })
                }
              />

              <label htmlFor="weight">Peso</label>
              <input
                type="number"
                name="weight"
                id="weight"
                required
                onChange={(e) =>
                  setFormData({ ...formData, weight: e.target.value })
                }
              />

              <label htmlFor="edad">Edad</label>
              <select
                name="edad"
                id="edad"
                onChange={(e) =>
                  setFormData({ ...formData, edad: e.target.value })
                }
              >
                {edades.map((edad) => (
                  <option value={edad} key={edad}>
                    {edad}
                  </option>
                ))}
              </select>
              <div className="botones-contenedor">
                <button className="rojo" onClick={handleCancel}>
                  <AiOutlineCloseCircle />
                </button>
                <button className="verde" onClick={handleSubmit}>
                  <BsCheckCircle />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
  background-color: #1a1a1a66;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  .contenedor-creacion {
    height: 90%;
    width: 50%;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1rem;
    border-radius: 25px;
    .superior {
      display: flex;
      justify-content: space-between;
      .exit {
        top: 5px;
        left: 500px;
      }
    }

    .form-crear {
      form {
        width: 80%;
      }
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      input {
        width: 100%;
        padding: 0.5rem;
        font-size: 1rem;
        border: 2px solid #dbe3e6;
        border-radius: 5px;
        :focus-within {
          border-color: #3876e2;
        }
        text-shadow: none;
        color: inherit;
        appearance: none;
        outline-style: none;
        background-color: transparent;
      }
      .izquierda {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
      }
      .derecha {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
      }
      .botones-contenedor {
        margin-top: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        button {
          width: 3rem;
          height: 2.5rem;
          border-radius: 50%;
          border: none;
          outline: none;
          cursor: pointer;
          color: #f5f5f5;
        }
        .rojo {
          background-color: rgba(245, 39, 99, 1);
          font-size: 1.5rem;
        }
        .verde {
          background-color: rgba(51, 214, 146, 1);
          font-size: 1.5rem;
        }
      }
    }
  }
`;
