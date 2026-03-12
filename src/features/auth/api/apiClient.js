import axios from "axios";
import { refreshAccessToken } from "./refreshToken";

const BASE_URL = import.meta.env.VITE_HOST || "http://localhost:3010";

const API = axios.create({ baseURL: BASE_URL });

function isTokenExpired(token) {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        // Considerar expirado si quedan menos de 10 segundos
        return Date.now() >= (payload.exp * 1000) - 10_000;
    } catch {
        return true;
    }
}

API.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

API.interceptors.response.use(response => response, async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(error);
    }

    // Solo intentar refresh si el token realmente expiró.
    // Un 401 con token vigente indica otro problema (ej. email no confirmado).
    const currentToken = localStorage.getItem('authToken');
    if (currentToken && !isTokenExpired(currentToken)) {
        return Promise.reject(error);
    }

    originalRequest._retry = true;

    const newToken = await refreshAccessToken();

    if (!newToken) return Promise.reject(error);

    originalRequest.headers.Authorization = `Bearer ${newToken}`;
    return API(originalRequest);
});

export default API;