import styled from "styled-components";
import { useParams } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { MuestraDB } from "./MuestraDB";
import { useState } from "react";
export function Muestra() {
  const { id } = useParams();
  const [query, setQuery] = useState("");
  const [dateQuery, setDateQuery] = useState("");
  const [timeQuery, setTimeQuery] = useState("");
  const samples = [
    {
      id: 1,
      date: "2021-10-10",
      time: "10:11",
    },
    {
      id: 2,
      date: "2021-10-12",
      time: "10:10:11",
    },
    {
      id: 3,
      date: "2021-10-13",
      time: "10:10:12",
    },
    {
      id: 4,
      date: "2021-10-13",
      time: "10:10:12",
    },
  ];
  function search(dato) {
    let isID = query !== "";
    let isDate = dateQuery !== "";
    let isTime = timeQuery !== "";
    console.log(timeQuery);
    console.log(dato[1].time == timeQuery);
    if (isDate) {
      dato = dato.filter((item) => item.date.includes(dateQuery));
    }
    if (isID) {
      dato = dato.filter((item) =>
        item.id.toString().includes(query.toString())
      );
    }
    if (isTime) {
      dato = dato.filter((item) =>
        item.time.substring(0, 5).includes(timeQuery)
      );
    }

    return dato.sort((a, b) => a.id - b.id);
  }

  return (
    <Container>
      <div className="table-container">
        <h1>Muestras Usuario ID:{id}</h1>
        <div className="filter-container">
          <div className="search-container">
            <div className="icon">
              <AiOutlineSearch />
            </div>
            <input
              type="text"
              placeholder="Buscar.."
              className="search"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="search-container">
            <div className="icon">
              <AiOutlineSearch />
            </div>
            <input
              type="date"
              className="search"
              value={dateQuery}
              onChange={(e) => setDateQuery(e.target.value)}
            />
          </div>

          <div className="search-container">
            <div className="icon">
              <AiOutlineSearch />
            </div>
            <input
              type="time"
              className="search"
              value={timeQuery}
              onChange={(e) => setTimeQuery(e.target.value)}
            />
          </div>
        </div>
        <MuestraDB data={search(samples)} />
      </div>
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
  background: #ecf0ff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .table-container {
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
    .filter-container {
      .button-container {
        border: 1px solid rgba(51, 214, 146, 1);
        background-color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        width: 40px;
        height: 40px;
        transition: all 0.3s ease;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        :hover {
          box-shadow: rgba(51, 214, 146, 1) 0px 4px 12px;
        }
        button {
          background: none;
          border: none;
          outline: none;
          color: #fff;
          cursor: pointer;
          width: 100%;
          height: 100%;
          font-size: 1rem;
          color: rgba(51, 214, 146, 1);
          padding: 0.5rem;
          :hover {
            text-shadow: 0px 0px 10px rgba(51, 214, 146, 1);
          }
        }
      }
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .search-container {
        margin-right: 1rem;
        display: flex;
        justify-content: center;
        align-items: start;
        background: #fff;
        padding: 0.5rem;
        width: 20%;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        border-radius: 25px;
        margin-top: 1rem;
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
      .checkbox-container {
        display: flex;
        justify-content: center;
        align-items: center;
        label {
          margin-left: 1rem;
          display: flex;
          input {
            margin-left: 0.5rem;
            cursor: pointer;
            width: 20px;
            height: 20px;
            border-radius: 50%;
          }
        }
      }
    }
  }
`;
