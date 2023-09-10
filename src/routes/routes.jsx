import { Routes, Route, BrowserRouter } from "react-router-dom";

import { LoginPage } from "../pages/login/LoginPage";

export default function AppRotas() {
  return (
    <BrowserRouter>
      <MenuLateral>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </MenuLateral>
    </BrowserRouter>
  );
}