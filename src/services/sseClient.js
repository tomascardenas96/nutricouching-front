import { fetchEventSource } from "@microsoft/fetch-event-source";
import { refreshAccessToken } from "../features/auth/api/refreshToken";

function isTokenExpired(token) {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return Date.now() >= (payload.exp * 1000) - 10_000;
    } catch {
        return true;
    }
}

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
        if (this._currentToken === token && this._controller) return;
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

        fetchEventSource(`${BASE_URL}/sse`, {
            headers: { Authorization: `Bearer ${token}` },
            signal: this._controller.signal,
            onopen: async (response) => {
                if (response.ok) return;
                if (response.status === 401 && !isRetry && isTokenExpired(token)) {
                    const newToken = await refreshAccessToken();
                    if (newToken) this._start(newToken, true);
                    throw new Error("401 — reconectando con nuevo token");
                }
                throw new Error(`SSE error: ${response.status}`);
            },
            onmessage: ({ event, data }) => {
                try {
                    this._emit(event, JSON.parse(data));
                } catch { }
            },
            onerror: (err) => {
                throw err; // detiene el auto-retry; la reconexión se maneja en onopen
            },
        }).catch(() => { });
    }
}

export const sseClient = new SSEClient();
