import styled from "styled-components";

export function TableUser({ data }) {
  console.log(data);
  return (
    <Container>
      <table>
        <tbody>
          <tr>
            <th>Imagen</th>
            <th>ID</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Altura</th>
            <th>Peso</th>
            <th>Estado</th>
          </tr>
          {data.map((item) => (
            <tr key={item.id} className="row">
              <td className="image-d">
                {" "}
                <img src={item.pp} alt="" className="profilePicture" />
              </td>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.height} cm</td>
              <td>{item.weight} kg</td>
              <td className={item.isactive ? "active" : "inactive"}>
                {item.isactive ? "Activo" : "Inactivo"}
              </td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  overflow: auto;
  margin-top: 20px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  table {
    border-collapse: collapse;
    border-spacing: 0;
    border: none;
    border-radius: 50%;
    width: 100%;
    th {
      padding: 16px;
      text-align: left;
      background: #f9faff;
    }
    td {
      padding: 16px;
    }
    tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    tr {
      border-bottom: 1px solid #ddd;
      background: #f9faff;
      
    }
    tr:hover {
      background-color: #ddd;
    }
  }
  .row {
    transition: all 0.3s ease;
    &:hover {
      background: #7182bf;
      cursor: pointer;
      color: #fff;
    }
    .image-d {
      width: 10%;
    }

    .profilePicture {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .active {
      color: rgba(51, 214, 146, 1);
      font-weight: bold;
    }
    .inactive {
      color: #f14864;
      font-weight: bold;
    }
  }
`;
