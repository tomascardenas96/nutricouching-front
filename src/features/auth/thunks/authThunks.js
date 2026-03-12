import { authApi } from "../api/authApi.js";
import {
    loginStart,
    loginSuccess,
    logout,
    loginFailure
} from "../states/authSlice.js";

export const loginUser = (credentials) => async (dispatch) => {
    dispatch(loginStart());
    try {
        const { token, refreshToken, user } = await authApi.login(credentials);
        dispatch(loginSuccess({ token, refreshToken, user }));
        return true;
    } catch (error) {
        dispatch(loginFailure(error.message));
        return false;
    }
};

export const loadUserProfile = () => async (dispatch, getState) => {
    const { token, isLoading } = getState().auth;

    // isLoading previene re-despachos cuando el token cambia por refresh
    if (!token || isLoading) return;

    dispatch(loginStart());

    try {
        const user = await authApi.getUserProfile();
        // Leer el token actual DESPUÉS de la llamada: el interceptor pudo haber
        // hecho un refresh y rotado el token durante el await anterior.
        const currentToken = getState().auth.token;
        dispatch(loginSuccess({ token: currentToken, user }));
    } catch {
        dispatch(logout());
    }
};

export const logoutUser = () => async (dispatch) => {
    await authApi.logout();
    dispatch(logout());
};