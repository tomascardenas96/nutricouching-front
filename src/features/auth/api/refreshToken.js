import axios from "axios";
import store from "../../../app/store";
import { tokenRefreshed, logout } from "../states/authSlice";

const BASE_URL = import.meta.env.VITE_HOST || "http://localhost:3010";

let isRefreshing = false;
let waiters = [];

/**
 * Refresca el access token usando el refreshToken guardado en localStorage.
 * Tiene queue interno para evitar llamadas paralelas al endpoint de refresh.
 * Retorna el nuevo accessToken, o null si el refresh falla.
 */
export const refreshAccessToken = async () => {
    if (isRefreshing) {
        return new Promise((resolve) => waiters.push(resolve));
    }

    isRefreshing = true;
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (!storedRefreshToken) {
        store.dispatch(logout());
        isRefreshing = false;
        waiters.forEach((resolve) => resolve(null));
        waiters = [];
        return null;
    }

    try {
        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
            refreshToken: storedRefreshToken,
        });
        store.dispatch(tokenRefreshed({ token: data.accessToken, refreshToken: data.refreshToken }));
        waiters.forEach((resolve) => resolve(data.accessToken));
        return data.accessToken;
    } catch (error) {
        // Solo cerrar sesión si el refresh token es explícitamente inválido/expirado (401).
        // Otros errores (403 email no confirmado, red, etc.) no deben invalidar la sesión.
        if (error.response?.status === 401) {
            store.dispatch(logout());
        }
        waiters.forEach((resolve) => resolve(null));
        return null;
    } finally {
        isRefreshing = false;
        waiters = [];
    }
};
