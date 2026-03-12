import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/states/authSlice";
// import cartReducer from "../features/cart/states/cartSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        // cart: cartReducer
    },
});

export default store;