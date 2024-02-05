import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home/home";
import Bookmark from "../pages/bookmark/bookmark";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/bookmark" element={<Bookmark />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRoutes;
