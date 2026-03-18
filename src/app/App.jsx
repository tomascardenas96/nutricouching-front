import "react-day-picker/style.css";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SessionInitializer from "../features/auth/components/Register/SessionInitializer.jsx";
import store from "./store";
import "../styles/App.css";
import AppRoutes from "./routes.jsx";
import CartProvider from "../features/cart/context/CartProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <CartProvider>
              <SessionInitializer>
                <AppRoutes />
              </SessionInitializer>
            </CartProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </HelmetProvider>
  );
}

export default App;
