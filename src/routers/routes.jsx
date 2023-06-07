import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Pruebas } from "../pages/Pruebas";
import { DataBase } from "../pages/db/user/DbUser";
import { Muestra } from "../pages/db/muestra/Muestras";
export function MyRoutes({ socket }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Pruebas" element={<Pruebas />} />
      <Route path="/BaseDatos" element={<DataBase />} />
      <Route path = '/muestras/:id' element = {<Muestra/>}/>
    </Routes>
  );
}
