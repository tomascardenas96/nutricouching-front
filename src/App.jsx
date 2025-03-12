import "./App.css";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProvider from "./context/UserProvider";
import ResetPassword from "./pages/Reset-password/ResetPassword";
import ElementsInCartProvider from "./context/ElementsInCartProvider";

function App() {
  return (
    <UserProvider>
      <ElementsInCartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </BrowserRouter>
      </ElementsInCartProvider>
    </UserProvider>
  );
}

export default App;
