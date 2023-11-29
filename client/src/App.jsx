import { Routes, Route, useLocation } from "react-router-dom";
import { Nav } from "./component/Nav/Nav";
import { LandingPage } from "./component/LandingPage/LandingPage";
import { Matricula } from "./component/Form/Matricula/Matricula";
import { RegistrarAsist } from "./component/Asistencia/RegistrarAsist";
import { Home } from "./component/Home/Home";
import { PageNotFound } from "./component/PageNotFound/PageNotFound";
import { HoverScroll } from "./component/Scroll/HoverScroll";
import "./App.css";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001/";

export const App = () => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname === "/" ? null : <Nav />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/matricula" element={<Matricula />} />
        <Route path="/asistencia" element={<RegistrarAsist />} />
        <Route path="/matriculas" element={<Home />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <HoverScroll />
    </>
  );
};
