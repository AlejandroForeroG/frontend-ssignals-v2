import { BrowserRouter } from "react-router-dom";
import { MyRoutes } from "./routers/routes";
import { Sidebar } from "./components/Sidebar";
import { useState } from "react";
import styled from "styled-components";
import { io } from "socket.io-client";
import { useEffect } from "react";
const socket = io("http://192.168.10.15:3100");

function App() {
 

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Container
          className={sidebarOpen ? "sidebarState active" : ""}
        >
          <section className="sidebar">
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          </section>
          <section>
            <MyRoutes socket ={socket} />
          </section>
        </Container>
      </BrowserRouter>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 90px auto;
  background-color: #fcfcfd;
  color: #212427;
  transition: all 0.3s ease;
  &.active {
    grid-template-columns: 300px auto;
  }
`;
export default App;
