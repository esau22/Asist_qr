import { Routes, Route, useLocation } from "react-router-dom";
import { Nav } from "./component/Nav/Nav";
import { LandingPage } from "./component/LandingPage/LandingPage";
import { Home } from "./component/Home/Home";
import { Detail } from "./component/Detail/Detail";
import { Form } from "./component/Form/Form";
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
        <Route path="/home" element={<Home />} />
        <Route path="/home/:id" element={<Detail />} />
        <Route path="/dog" element={<Form />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <HoverScroll />
    </>
  );
};
