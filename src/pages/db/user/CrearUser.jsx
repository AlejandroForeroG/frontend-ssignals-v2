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
            <div className="input-container">
              <span className="label-span">Nombre</span>
              <input
                type="text"
                name="name"
                id="name"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="input-container">
              <span className="label-span">link imagen</span>
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
              <div className="input-container">
                <span className="label-span">Altura</span>
                <input
                  type="number"
                  name="height"
                  id="height"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, height: e.target.value })
                  }
                />
              </div>
              <div className="input-container">
                <span className="label-span">Peso</span>
                <input
                  type="number"
                  name="weight"
                  id="weight"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, weight: e.target.value })
                  }
                />
              </div>
              <div className="input-container">
                <span className="label-span">Edad</span>
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
              </div>
            </div>
            <div className="botones-contenedor">
              <button className="rojo" onClick={handleCancel}>
                Cancelar
              </button>
              <button className="verde" onClick={handleSubmit}>
                Crear
              </button>
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
      flex-direction: column;
      .input-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
        margin-bottom: 1rem;
        flex-direction: column;
        border: 1px solid #b6b6b6;
        border-radius: 8px;
        padding: 0.5rem;
        margin-top: 0.5rem;
        .label-span {
          font-size: 13px;
          width: 100%;
        }
        :focus-within {
          border-color: rgba(51, 214, 146, 1);
          .label-span {
            color: rgba(51, 214, 146, 1);
          }
        }
        input {
          width: 100%;
          text-shadow: none;
          color: inherit;
          appearance: none;
          outline-style: none;
          border-width: 0;
          background-color: transparent;
        }
      }

      .derecha {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        .input-container {
          width: 30%;
        }
      }
      .botones-contenedor {
        margin-top: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        button {
          height: 2.5rem;
          width: 7rem;
          border-radius: 25px;
          border: none;
          outline: none;
          cursor: pointer;
          color: #f5f5f5;
          transition: all 0.3s ease-in-out;
        }
        .rojo {
          background-color: rgba(245, 39, 99, 1);
          :hover {
            background-color: rgba(245, 39, 99, 0.8);
          }
        }
        .verde {
          background-color: rgba(51, 214, 146, 1);
          :hover {
            background-color: rgba(51, 214, 146, 0.8);
          }
        }
      }
    }
  }
`;
