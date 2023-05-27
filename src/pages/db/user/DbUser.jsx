import styled from "styled-components";
import { useGetUsersQuery } from "../../../store/services/userApi";
import { useState, useEffect } from "react";
import { TableUser } from "./TableUsers";
import { AiOutlineSearch } from "react-icons/ai";
import { CrearUser } from "./CrearUser";
export function DataBase() {
  const { data: users, error, isLoading } = useGetUsersQuery();

  const [query, seyQuery] = useState("");
  const [state, setState] = useState(false);

  const search = (data) => {
    return data
      .filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.id.toString().includes(query)
      )
      .sort((a, b) => a.id - b.id);
  };
  
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

  return (
    <Container>
      <div className="button-container">
        <h1>Base de datos</h1>
        <div className="table-container">
          <div className="search-container">
            <div className="icon">
              <AiOutlineSearch />
            </div>
            <input
              type="text"
              placeholder="Buscar.."
              className="search"
              onChange={(e) => seyQuery(e.target.value)}
            />
          </div>
          <button className="crear-user" onClick={() =>setState(true)}>Crear usuario</button>
        </div>
        <TableUser data={search(users)} />
      </div>
      {state && (
        <CrearUser setState = {setState}/>
      )}
    </Container>
  );
}



const Container = styled.div`
  width: 95vw;
  height: 100vh;
  background: #ecf0ff;
  display: flex;
  align-items: center;
  justify-content: center;

  .button-container {
    padding: 1.5rem;
    border-radius: 25px;
    height: 90%;
    width: 80%;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    h1 {
      text-align: left;
      width: 100%;
    }
  }
  .table-container {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .crear-user {
      background: rgba(51, 214, 146, 1);
      color: #fff;
      border: 25px;
      width: 10%;
      height: 2.5rem;
      margin-left: 1rem;
      border-radius: 25px;
      cursor: pointer;
      :active {
        background: rgba(51, 214, 146, 0.8);
      }
    }
    .button {
      margin-left: 1rem;
    }
    .search-container {
      display: flex;
      justify-content: center;
      align-items: start;
      background: #fff;
      padding: 0.5rem;
      width: 90%;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
      border-radius: 25px;
      .icon {
        color: #5957ca;
      }
      .search {
        width: 100%;
        border: none;
        outline: none;
        background: none;
        margin-left: 0.5rem;
      }
    }
  }
`;
