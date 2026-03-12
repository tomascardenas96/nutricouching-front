import API from "./apiClient"

export const authApi = {
    login: async (credentials) => {
        try {
            const response = await API.post("/auth/login", credentials);
            return {
                token: response.data.accessToken,
                refreshToken: response.data.refreshToken,
                user: response.data.user
            }
        } catch {
            throw new Error("Email o contraseña incorrectos");
        }
    },
    getUserProfile: async () => {
        const response = await API.get("/auth/active-user");
        return response.data;
    },
    register: async (data) => {
        const response = await API.post("/auth/register", data);
        return response.data;
    },
    logout: async () => {
        try {
            await API.post("/auth/logout");
        } catch {
            // Si falla, igual limpiamos el estado local
        }
    }
}