import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { sseClient } from "./sseClient";

/**
 * Suscribe a un evento SSE del servidor.
 * Se conecta automáticamente cuando hay token, se desconecta al hacer logout,
 * y se reconecta cuando el token cambia (tras un refresh).
 *
 * @param {string} event - Nombre del evento SSE
 * @param {function} callback - Handler del evento (no necesita ser estable)
 */
export function useSSEEvent(event, callback) {
    const token = useSelector((state) => state.auth.token);
    // const isEmailConfirmed = useSelector((state) => state.auth.user?.isEmailConfirmed);
    const callbackRef = useRef(callback);
    callbackRef.current = callback;

    useEffect(() => {
        // if (!token || !isEmailConfirmed) {
        if (!token) {
            sseClient.disconnect();
            return;
        }

        sseClient.connect(token);

        const handler = (data) => callbackRef.current(data);
        sseClient.on(event, handler);

        return () => sseClient.off(event, handler);
    // }, [token, isEmailConfirmed, event]);
    }, [token, event]);
}
