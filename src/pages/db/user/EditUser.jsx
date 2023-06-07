import styled from "styled-components";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  useEditUserMutation,
  useDeleteUserMutation,
} from "../../../store/services/userApi";

export function EditUser({ actualUser, setState }) {
  const [editUser, { isLoading, error }] = useEditUserMutation();
  const [deleteUser, { isLoading2, error2 }] = useDeleteUserMutation();
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    await editUser(formData);
    setState("base");
  }

  async function handleDelete(e) {
    e.preventDefault();

    console.log(formData);
    await deleteUser(formData.id);
    setState("base");
  }
  const [formData, setFormData] = useState({
    id: actualUser.id,
    name: actualUser.name,
    pp: actualUser.pp,
    height: actualUser.height,
    weight: actualUser.weight,
    age: actualUser.age,
  });

  return (
    <Container>
      <div className="internal-container">
        <div className="inner-container">
          <div className="button-container">
            <div className="cerrar-container">
              <button
                className="close-button"
                onClick={() => {
                  setState("base");
                }}
              >
                <AiOutlineClose />
              </button>
              <h1 className="title">Manejo de usuario</h1>
            </div>
            <Link
              to={`/muestras/${actualUser.id}`}
              className="button-muestras"
            >
              Muestras
            </Link>
            <button
              className="save-button"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Guardar
            </button>
          </div>

          <div className="info-edit">
            <div className="img-container">
              <img src={actualUser.pp} alt="" />
            </div>
          </div>
          <h3>ID: {actualUser.id}</h3>

          <form>
            <div className="form-container">
              <div className="input-container">
                <span className="label-span">Nombre</span>
                <input
                  type="text"
                  Value={actualUser.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                  }}
                />
              </div>
              <div className="input-container">
                <span className="label-span">Imagen</span>
                <input
                  type="text"
                  Value={actualUser.pp}
                  onChange={(e) => {
                    setFormData({ ...formData, pp: e.target.value });
                  }}
                />
              </div>
              <div className="numbers-container">
                <div className="input-container">
                  <span className="label-span">Edad</span>
                  <input
                    type="number"
                    Value={actualUser.age}
                    onChange={(e) => {
                      setFormData({ ...formData, age: e.target.value });
                    }}
                  />
                </div>
                <div className="input-container">
                  <span className="label-span">Peso</span>
                  <input
                    type="number"
                    Value={actualUser.weight}
                    onChange={(e) => {
                      setFormData({ ...formData, weight: e.target.value });
                    }}
                  />
                </div>
                <div className="input-container">
                  <span className="label-span">Altura</span>
                  <input
                    type="number"
                    Value={actualUser.height}
                    onChange={(e) => {
                      setFormData({ ...formData, height: e.target.value });
                    }}
                  />
                </div>
              </div>
              <button
                onClick={(e) => {
                  handleDelete(e);
                }}
              >
                Borrar Usuario (No se puede deshacer).
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
  .internal-container {
    height: 90%;
    width: 40%;
    background-color: #f5f5f5;
    padding: 1rem;
    border-radius: 25px;
    .inner-container {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      background-color: #f5f5f5;
    }
    .button-container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-direction: row;

      .cerrar-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 70%;
      }
      .title {
        text-align: left;
      }

      button {
        font-size: 1rem;
        cursor: pointer;
        width: 30%;
        border-radius: 8px;
        border: none;
        background-color: transparent;
        transition: 0.5s;
      }

      .button-muestras {
        text-decoration: none;
        text-align: center;
        background-color: #4268e4;
        width: 30%;
        cursor: pointer;
        border-radius: 25px;
        padding: 0.5rem;
        color: white;
        font-size: 1rem;
        border-color: transparent;
        margin-right: 1rem;
        :hover {
          background-color: #4268e4cc;
        }
      }

        .save-button {
          background-color: #33d692;
          border-radius: 25px;
          padding: 0.5rem;
          color: white;
          font-size: 1rem;
          :hover {
            background-color: #33d692cc;
          }
        }

        .close-button {
          border-radius: 50%;
          padding: 0.5rem;
          width: 3rem;

          margin-right: 1rem;
          :hover {
            background-color: #b0acae79;
          }
        }
      }
      .info-edit {
        .img-container {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          flex-direction: row;
          img {
            border-radius: 50%;
            width: 8rem;
          }
        }
      }
      form {
        width: 100%;
      }
      .form-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .numbers-container {
          display: flex;
          justify-content: space-around;
          width: 100%;

          .input-container {
            width: 32%;
          }
        }
        .input-container {
          width: 100%;
          border: 2px solid #dbe3e6;
          border-radius: 8px;
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          margin-top: 0.5rem;
          :focus-within {
            border-color: rgba(51, 214, 146, 1);
            .label-span {
              color: rgba(51, 214, 146, 1);
            }
          }
          .label-span {
            font-size: 11px;
          }
        }
        input {
          text-shadow: none;
          color: inherit;
          appearance: none;
          outline-style: none;
          border-width: 0;
          background-color: transparent;
        }
        button {
          margin-top: 1.5rem;
          transition: 0.5s; 
          width: 90%;
          border-radius: 25px;

          padding: 0.5rem;
          border-color: transparent;
          color: white;
          cursor: pointer;
          background-color: #d6337c;
          box-shadow: none;
          :hover{
            background-color: #d6337ccc;
          }
      
        }
      }
    }
    
  }

`;
