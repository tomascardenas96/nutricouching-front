# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server on port 5173
npm run build      # Production build
npm run lint       # ESLint check
npm run preview    # Preview production build
```

Environment: copy `.env.example` to `.env.local` and set `VITE_HOST` and `VITE_WEBSOCKET_HOST`.

## Architecture

**React + Vite SPA** for a nutrition coaching platform. Backend API base URL is configured via `src/api/data.js` from `VITE_HOST` env var.

### State Management (Hybrid)

- **Redux Toolkit** (`src/app/store.js`): Auth state only — `authSlice` handles login/logout/session
- **Context API** (`CartProvider`): Cart state
- **TanStack React Query**: Server data fetching in most feature hooks

### Feature-Based Structure

Every domain lives in `src/features/<domain>/` and follows this pattern:

```
src/features/<domain>/
  api/          # axios calls
  components/   # React components
  hooks/        # custom hooks (useGetX, useCreateX, etc.)
  states/       # Redux slices (auth only)
  thunks/       # Redux async thunks (auth only)
  index.js      # barrel exports
```

### Auth

- `src/features/auth/api/apiClient.js` — Axios instance that injects `Authorization: Bearer <token>` from localStorage and redirects on 401
- `src/features/auth/states/authSlice.js` — Redux slice with `loginStart/Success/Failure/logout`
- `src/features/auth/components/ProtectedRoute.jsx` — Role-based route guard (`root`, `admin`/professional, user)
- `src/features/auth/components/Register/SessionInitializer.jsx` — Mounted in `App.jsx` to restore session on load

### Routing (`src/app/routes.jsx`)

| Path                    | Component              | Auth         |
| ----------------------- | ---------------------- | ------------ |
| `/`                     | Home                   | Public       |
| `/login`                | LoginForm              | Public       |
| `/profile/:slug`        | Profile                | Public       |
| `/filter/professionals` | Professional filter    | Public       |
| `/reset-password`       | ResetPassword          | Public       |
| `/root`                 | Admin dashboard        | `root` role  |
| `/professional`         | Professional dashboard | `admin` role |

### Key Libraries

- **MUI v6** for UI components
- **Sonner** for toast notifications
- **Socket.io-client** for real-time (WebSocket)
- **Mercado Pago SDK** for payments
- **React Helmet Async** for `<head>` management
- **date-fns** + **react-datepicker** / **react-day-picker** for dates

### Backend Context

# Backend Context — nutricouching

Documento de referencia para el frontend. Describe la API REST, el sistema de autenticación, los eventos en tiempo real y los cambios relevantes recientes.

---

## Stack

- **NestJS** + **TypeORM** + **PostgreSQL**
- **JWT** (access token 15m + refresh token 7d)
- **MercadoPago** para pagos
- **SSE** (Server-Sent Events) para notificaciones en tiempo real
- **Cloudinary** para imágenes y archivos

---

## Autenticación

Todas las rutas protegidas requieren el header:

```
Authorization: Bearer <accessToken>
```

### Flujo de tokens

| Evento                      | Acción                                                   |
| --------------------------- | -------------------------------------------------------- |
| Login exitoso               | Recibís `accessToken` (15m) + `refreshToken` (7d)        |
| Access token expirado (401) | Llamar `POST /auth/refresh` con el refresh token         |
| Refresh exitoso             | Recibís nuevos `accessToken` + `refreshToken` (rotación) |
| Logout                      | `POST /auth/logout` invalida el refresh token en DB      |

**El refresh token se rota en cada uso** — siempre guardá el nuevo par de tokens que devuelve `/auth/refresh`.

### Roles

```
admin | professional | user
```

---

## Endpoints

### Auth — `POST/GET /auth/*`

| Método | Ruta                           | Auth | Body                                      | Respuesta                             |
| ------ | ------------------------------ | ---- | ----------------------------------------- | ------------------------------------- |
| POST   | `/auth/register`               | No   | `{ email, password, name, lastname }`     | `{ message }`                         |
| POST   | `/auth/login`                  | No   | `{ email, password }`                     | `{ accessToken, refreshToken, user }` |
| POST   | `/auth/refresh`                | No   | `{ refreshToken }`                        | `{ accessToken, refreshToken }`       |
| POST   | `/auth/logout`                 | Sí   | —                                         | 204                                   |
| GET    | `/auth/active-user`            | Sí   | —                                         | User object                           |
| GET    | `/auth/confirm?token=`         | No   | —                                         | `{ message }`                         |
| POST   | `/auth/send-confirmation-mail` | No   | `{ email }`                               | `{ message }`                         |
| POST   | `/auth/forgot-password`        | No   | `{ email }`                               | `{ message }`                         |
| POST   | `/auth/reset-password`         | No   | `{ token, newPassword, confirmPassword }` | `{ message }`                         |

**Login response:**

```json
{
  "accessToken": "...",
  "refreshToken": "...",
  "user": {
    "userId": "uuid",
    "email": "...",
    "name": "...",
    "lastname": "...",
    "role": "user | professional | admin",
    "isEmailConfirmed": true,
    "createdAt": "..."
  }
}
```

---

### SSE — Tiempo real

**CAMBIO BREAKING: Socket.io fue reemplazado por SSE.**

```
GET /sse
Authorization: Bearer <accessToken>
```

Conectar con `EventSource` (o equivalente con headers):

```typescript
// El EventSource nativo no soporta headers — usar fetch o una librería
const es = new EventSourcePolyfill("https://api.example.com/sse", {
  headers: { Authorization: `Bearer ${accessToken}` },
});

// Eventos disponibles:
es.addEventListener("reservedShift", (e) => {
  const notification = JSON.parse(e.data); // Notification entity
});

es.addEventListener("deletedBookingNotify", (e) => {
  const notification = JSON.parse(e.data);
});

es.addEventListener("afterPurchaseNotify", (e) => {
  // { ...notification, status: 'approved'|'rejected'|'pending', service: ServiceType }
  const data = JSON.parse(e.data);
});

es.addEventListener("purchasedPlan", (e) => {
  const planId = JSON.parse(e.data); // string
});

es.addEventListener("sendNewCart", (e) => {
  const cart = JSON.parse(e.data); // Cart entity
});
```

**ServiceType enum** (campo `service` en `afterPurchaseNotify`):

```
cart | plan_download | resource_download
```

**Reconexión**: si el access token expira, cerrar la conexión SSE, refrescar el token y reconectar.

---

### Users — `/user`

| Método | Ruta    | Auth  | Descripción                             |
| ------ | ------- | ----- | --------------------------------------- |
| GET    | `/user` | admin | Listar todos los usuarios               |
| PATCH  | `/user` | Sí    | Modificar datos del usuario autenticado |

---

### Professionals — `/professional`

| Método | Ruta                                                     | Auth  | Descripción              |
| ------ | -------------------------------------------------------- | ----- | ------------------------ |
| GET    | `/professional`                                          | No    | Listar todos             |
| GET    | `/professional/filter?every=&name=&specialty=&category=` | No    | Filtrar profesionales    |
| GET    | `/professional/specialty?id=<uuid>`                      | No    | Por especialidad         |
| GET    | `/professional/profilename/:slug`                        | No    | Por nombre de perfil     |
| POST   | `/professional/create`                                   | admin | Crear (multipart `file`) |
| PATCH  | `/professional/update/:professionalId`                   | admin | Modificar                |
| DELETE | `/professional/delete/:professionalId`                   | admin | Eliminar                 |

---

### Profile — `/profile`

| Método | Ruta                         | Auth         | Descripción                        |
| ------ | ---------------------------- | ------------ | ---------------------------------- |
| GET    | `/profile/:id`               | No           | Ver perfil por ID                  |
| GET    | `/profile/name/:profilename` | No           | Ver perfil por slug                |
| PATCH  | `/profile/photo/:id`         | professional | Foto de perfil (multipart `file`)  |
| PATCH  | `/profile/cover/:id`         | professional | Foto de portada (multipart `file`) |
| PATCH  | `/profile/update`            | professional | Actualizar info del perfil         |

---

### Availability — `/availability`

| Método | Ruta                                                | Auth               | Descripción                         |
| ------ | --------------------------------------------------- | ------------------ | ----------------------------------- |
| GET    | `/availability?professional=<id>&date=<YYYY-MM-DD>` | No                 | Horarios disponibles para una fecha |
| GET    | `/availability/professional/:professionalId`        | No                 | Todos los slots del profesional     |
| POST   | `/availability/:professionalId`                     | admin/professional | Crear horarios (array)              |
| DELETE | `/availability?startTime=&professionalId=&day=`     | admin/professional | Eliminar slot                       |

---

### Bookings — `/booking`

| Método | Ruta                                             | Auth               | Descripción                        |
| ------ | ------------------------------------------------ | ------------------ | ---------------------------------- |
| POST   | `/booking/create`                                | Sí                 | Reservar turno                     |
| GET    | `/booking/user`                                  | Sí                 | Turnos del usuario autenticado     |
| GET    | `/booking/professional?professionalId=`          | admin/professional | Turnos del profesional             |
| GET    | `/booking/available?date=&professionalId=`       | No                 | Verificar si fecha está disponible |
| DELETE | `/booking/delete/:bookingId/active-user/:userId` | Sí                 | Cancelar turno                     |

**Create booking body:**

```json
{
  "professionalId": "uuid",
  "specialtyId": "uuid",
  "date": "2025-06-15",
  "startTime": "09:00:00",
  "endTime": "09:30:00",
  "interval": 30
}
```

---

### Cart — `/cart`

| Método | Ruta           | Auth | Descripción                        |
| ------ | -------------- | ---- | ---------------------------------- |
| GET    | `/cart/active` | Sí   | Obtener carrito activo del usuario |

---

### Cart Items — `/cart-item`

| Método | Ruta                                 | Auth | Descripción                                                       |
| ------ | ------------------------------------ | ---- | ----------------------------------------------------------------- |
| POST   | `/cart-item/add-element`             | Sí   | Agregar un elemento al carrito                                    |
| POST   | `/cart-item/add/:cartId`             | Sí   | Agregar múltiples productos al carrito                            |
| GET    | `/cart-item/:cartId`                 | Sí   | Ver elementos del carrito (valida que el carrito sea del usuario) |
| PATCH  | `/cart-item/add-subtract/:elementId` | Sí   | Sumar o restar unidad                                             |
| DELETE | `/cart-item/:cartId`                 | Sí   | Vaciar carrito                                                    |

**Add/subtract body:**

```json
{ "action": "add" | "subtract" }
```

> Si la cantidad llega a 0 al restar, el ítem se elimina automáticamente.

---

### Client Orders — `/client-order`

| Método | Ruta                           | Auth  | Descripción                      |
| ------ | ------------------------------ | ----- | -------------------------------- |
| POST   | `/client-order/create/:cartId` | Sí    | Crear orden a partir del carrito |
| PATCH  | `/client-order/:id/delivered`  | admin | Marcar orden como entregada      |

---

### MercadoPago — `/mercadopago`

| Método | Ruta                      | Auth | Descripción               |
| ------ | ------------------------- | ---- | ------------------------- |
| POST   | `/mercadopago/preference` | Sí   | Crear preferencia de pago |

**Body:** array de `ProductsInCartDto`:

```json
[
  {
    "cartItemId": "uuid",
    "product": { ... } | null,
    "viand": { ... } | null,
    "quantity": 2
  }
]
```

**Respuesta:** URL de checkout de MercadoPago.

---

### Plans — `/plan`

| Método | Ruta                     | Auth  | Descripción                            |
| ------ | ------------------------ | ----- | -------------------------------------- |
| GET    | `/plan/all`              | No    | Listar todos los planes                |
| POST   | `/plan`                  | admin | Crear plan (multipart: `pdf`, `image`) |
| POST   | `/plan/:planId/purchase` | Sí    | Comprar plan (crea preferencia MP)     |
| GET    | `/plan/:planId/download` | Sí    | URL de descarga privada del PDF        |
| PATCH  | `/plan/:planId`          | admin | Actualizar plan                        |
| DELETE | `/plan/:planId`          | admin | Eliminar plan                          |

---

### Resources — `/resource`

| Método | Ruta                             | Auth  | Descripción                               |
| ------ | -------------------------------- | ----- | ----------------------------------------- |
| GET    | `/resource/all`                  | No    | Listar todos los recursos                 |
| POST   | `/resource`                      | admin | Crear recurso (multipart: `pdf`, `image`) |
| POST   | `/resource/:resourceId/purchase` | Sí    | Comprar recurso (crea preferencia MP)     |
| GET    | `/resource/:resourceId/download` | Sí    | URL de descarga privada del PDF           |
| PATCH  | `/resource/:resourceId`          | admin | Actualizar recurso                        |
| DELETE | `/resource/:resourceId`          | admin | Eliminar recurso                          |

---

### Notifications — `/notification`

| Método | Ruta            | Auth | Descripción                            |
| ------ | --------------- | ---- | -------------------------------------- |
| GET    | `/notification` | Sí   | Notificaciones del usuario autenticado |
| PATCH  | `/notification` | Sí   | Marcar como leídas                     |

**Mark as read body:**

```json
{ "notificationIds": ["uuid", "uuid"] }
```

---

### Posts — `/post`

| Método | Ruta               | Auth          | Descripción                   |
| ------ | ------------------ | ------------- | ----------------------------- |
| POST   | `/post`            | Sí            | Crear post (multipart `file`) |
| GET    | `/post/:profileId` | No (opcional) | Posts de un perfil            |
| DELETE | `/post/:id`        | Sí            | Eliminar post                 |

---

### Products — `/product`

| Método | Ruta                         | Auth  | Descripción              |
| ------ | ---------------------------- | ----- | ------------------------ |
| GET    | `/product`                   | No    | Listar todos             |
| POST   | `/product`                   | admin | Crear (multipart `file`) |
| PATCH  | `/product/update/:productId` | admin | Modificar                |
| DELETE | `/product/delete/:productId` | admin | Eliminar                 |

---

### Viands — `/viand`

| Método | Ruta                     | Auth  | Descripción              |
| ------ | ------------------------ | ----- | ------------------------ |
| GET    | `/viand`                 | No    | Listar todas             |
| POST   | `/viand/create`          | admin | Crear (multipart `file`) |
| PATCH  | `/viand/update/:viandId` | admin | Modificar                |
| DELETE | `/viand/delete/:viandId` | admin | Eliminar                 |

---

### Invoices — `/invoice`

| Método | Ruta          | Auth  | Descripción                            |
| ------ | ------------- | ----- | -------------------------------------- |
| GET    | `/invoice`    | admin | Todas las facturas agrupadas por orden |
| GET    | `/invoice/me` | Sí    | Historial del usuario autenticado      |

---

## Cambios recientes relevantes para el frontend

### 1. Socket.io → SSE (BREAKING)

La conexión en tiempo real ya no usa Socket.io. Ver sección SSE arriba.

### 2. Refresh token

El backend ahora emite dos tokens en el login. Implementar rotación: al recibir 401, llamar `/auth/refresh` y reintentar.

### 3. Cart items — auth obligatorio

`GET /cart-item/:cartId` ahora valida que el `cartId` pertenezca al usuario autenticado. Devuelve **403** si no coincide.

### 4. Cart items — delete automático al restar

Si se resta y la cantidad llega a 0, el backend elimina el ítem automáticamente (no devuelve error).

### 5. Webhook — procesado automático

Después de un pago aprobado, el backend:

- Resta stock automáticamente
- Genera la factura
- Crea un nuevo carrito vacío y envía el evento `sendNewCart` por SSE
- Envía el evento `afterPurchaseNotify` por SSE
