import { fetchEventSource } from "@microsoft/fetch-event-source";
import { refreshAccessToken } from "../features/auth/api/refreshToken";

const BASE_URL = import.meta.env.VITE_HOST || "http://localhost:3010";

class SSEClient {
    constructor() {
        this._listeners = new Map();
        this._controller = null;
        this._currentToken = null;
    }

    on(event, handler) {
        if (!this._listeners.has(event)) {
            this._listeners.set(event, new Set());
        }
        this._listeners.get(event).add(handler);
    }

    off(event, handler) {
        this._listeners.get(event)?.delete(handler);
    }

    connect(token) {
        // Reconectar si el token cambió o si el controller anterior fue abortado (conexión muerta)
        const isAlive = this._controller && !this._controller.signal.aborted;
        if (this._currentToken === token && isAlive) return;
        this._start(token, false);
    }

    disconnect() {
        this._controller?.abort();
        this._controller = null;
        this._currentToken = null;
    }

    _emit(event, data) {
        this._listeners.get(event)?.forEach((cb) => cb(data));
    }

    _start(token, isRetry) {
        this._controller?.abort();
        this._currentToken = token;
        this._controller = new AbortController();

        // Flag local: distingue paradas intencionales (401, error HTTP) de errores transitorios.
        // Si es intencional, onerror debe throw para detener el loop viejo.
        // Si es transitorio, onerror no throw y fetchEventSource reintenta automáticamente.
        let intentionalStop = false;

        fetchEventSource(`${BASE_URL}/sse`, {
            headers: { Authorization: `Bearer ${token}` },
            signal: this._controller.signal,
            openWhenHidden: true,
            onopen: async (response) => {
                if (response.ok) return;
                if (response.status === 401 && !isRetry) {
                    intentionalStop = true;
                    const newToken = await refreshAccessToken();
                    if (newToken) this._start(newToken, true);
                    throw new Error("401 — reconectando con nuevo token");
                }
                intentionalStop = true;
                throw new Error(`SSE error: ${response.status}`);
            },
            onmessage: ({ event, data }) => {
                try {
                    this._emit(event, JSON.parse(data));
                } catch { }
            },
            onerror: (err) => {
                if (intentionalStop) throw err;
            },
        }).catch(() => { });
    }
}

export const sseClient = new SSEClient();
