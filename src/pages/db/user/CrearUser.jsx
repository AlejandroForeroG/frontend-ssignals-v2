import styled from "styled-components";
import { BsCheckCircle } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
export function CrearUser() {
  const edades = Array.from({ length: 120 }, (_, i) => i + 1); // Genera una matriz de edades del 1 al 120

  return (
    <Container>
      <div className="contenedor-creacion">
        <h1>Crear usuario</h1>
        <div className="form-crear">
          <form>
            <div className="izquierda">
              <label htmlFor="name">Nombre</label>
              <input type="text" name="name" id="name" />

              <label htmlFor="pp">link imagen</label>
              <input type="pp" name="pp" id="pp" />
            </div>
            <div className="derecha">
              <label htmlFor="height">Altura</label>
              <input type="number" name="height" id="height" required />

              <label htmlFor="weight">Peso</label>
              <input type="number" name="weight" id="weight" required />

              <label htmlFor="edad">Edad</label>
              <select name="edad" id="edad">
                {edades.map((edad) => (
                  <option value={edad} key={edad}>
                    {edad}
                  </option>
                ))}
              </select>
              <div className="botones-contenedor">
                <button className="rojo">
                  <AiOutlineCloseCircle />
                </button>
                <button className="verde">
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
    height: 50%;
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
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      input {
        padding: 0.5rem;
        font-size: 1rem;
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
          width: 45%;
          height: 2.5rem;
          border-radius: 15px;
          border: none;
          outline: none;
          cursor: pointer;
          color: #f5f5f5;
        }
        .rojo {
          background-color: rgba(245, 39, 99, 1);
        }
        .verde {
          background-color: rgba(51, 214, 146, 1);
        }
      }
    }
  }
`;
