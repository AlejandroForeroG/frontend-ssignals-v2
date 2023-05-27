import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Pruebas } from "../pages/Pruebas";
import { DataBase } from "../pages/db/user/DbUser";

export function MyRoutes({ socket }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Pruebas" element={<Pruebas />} />
      <Route path="/BaseDatos" element={<DataBase />} />
    </Routes>
  );
}
