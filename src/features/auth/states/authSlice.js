import { createSlice } from "@reduxjs/toolkit"

const storedUser = (() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
})();

const initialState = {
    token: localStorage.getItem("authToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    user: storedUser || null,
    isAuthenticated: !!localStorage.getItem("authToken"),
    isLoading: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.isLoading = false;
            localStorage.setItem("authToken", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            if (action.payload.refreshToken) {
                state.refreshToken = action.payload.refreshToken;
                localStorage.setItem("refreshToken", action.payload.refreshToken);
            }
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        tokenRefreshed: (state, action) => {
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            localStorage.setItem("authToken", action.payload.token);
            localStorage.setItem("refreshToken", action.payload.refreshToken);
        },
        logout: (state) => {
            state.token = null;
            state.refreshToken = null;
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
            localStorage.removeItem("authToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
        }
    }
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    tokenRefreshed,
    logout
} = authSlice.actions;

export default authSlice.reducer;
