import "react-day-picker/style.css";
import LoginProvider from "../features/auth/context/LoginProvider.jsx";
import UserProvider from "../features/auth/context/UserProvider.jsx";
import CartProvider from "../features/cart/context/CartProvider.jsx";
import "../styles/App.css";
import AppRoutes from "./routes.jsx";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <UserProvider>
          <LoginProvider>
            <CartProvider>
              <AppRoutes />
            </CartProvider>
          </LoginProvider>
        </UserProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
