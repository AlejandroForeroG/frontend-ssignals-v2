import styled from "styled-components";
export function MuestraDB({ data }) {
  return (
    <Container>
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Hora</th>
          </tr>
          {data.map((item) => (
            <tr
              key={item.id}
              className="row"
              //   onClick={(e) => {
              //     setState("edit");
              //     passData(item);
              //   }}
            >
              <td>{item.id}</td>
              <td>{item.date}</td>
              <td>{item.time}</td>
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
  }
`;
