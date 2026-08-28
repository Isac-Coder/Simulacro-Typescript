# Gestión de Productos — Frontend

Frontend en React + TypeScript que consume la API REST de [gestion-de-productos](https://github.com/carlosdcastano/gestion-de-productos) (NestJS + PostgreSQL/Supabase), siguiendo el simulacro de prueba de desempeño.

## Stack

- **Vite + React + TypeScript**
- **react-router-dom** para el ruteo
- **fetch nativo** para las peticiones HTTP (sin librerías extra)
- Sin librería de estado global: `AuthContext` + hooks locales (`useFetch`/`useMutation`) fue suficiente para el alcance del proyecto

## Cómo correrlo

```bash
npm install
npm run dev
```

La API debe estar corriendo en `http://localhost:3000` (ver `services/request.ts` si cambia el puerto).

## Estructura

```
src/
├── types/          # interfaces del dominio (User, Category, Product, Auth...)
├── services/        # capa HTTP: request<T>, errores, token storage
├── hooks/            # useFetch (GET) y useMutation (POST/PATCH/DELETE)
├── context/         # AuthContext: sesión, login, register, logout
├── routes/          # ProtectedRoute y RoleRoute
├── components/  # Navbar, Layout, ProductForm, FavoriteButton
└── pages/            # una página por vista
```

## Decisiones técnicas

**fetch en vez de Axios.** Se evaluó Axios por sus interceptores nativos, pero se optó por `fetch` para no sumar una dependencia cuando el mismo comportamiento (adjuntar token, normalizar errores, reaccionar a 401) cabe en una sola función `request<T>` en `services/request.ts`. Esa función centraliza:
- inyección del header `Authorization` si hay token guardado
- diferenciación entre error de red (`NetworkError`, el `fetch` nunca llegó a responder) y error de la API (`ApiError`, la API respondió con un status de error)
- limpieza automática de la sesión si la API responde 401

**localStorage para el accessToken**, en vez de sessionStorage. Se eligió porque el simulacro pide que la sesión sobreviva a un refresh de página, y localStorage persiste entre pestañas y reinicios del navegador. La contrapartida (el token queda expuesto más tiempo si el equipo es compartido) se consideró aceptable para el alcance de esta prueba.

**`useFetch<T>` y `useMutation<T>` como hooks genéricos**, en vez de repetir `try/catch` en cada componente. `useFetch` dispara solo en un `useEffect` (para GET); `useMutation` se dispara manualmente (para POST/PATCH/DELETE) y expone `loading`/`error` para que cada formulario decida qué mostrar. Ambos comparten la función `errorMessage()` de `services/errors.ts`, así ningún componente inventa su propio texto de error.

**Filtros y paginación de productos viven en la URL** (`useSearchParams`), no en `useState` local. Así recargar la página o compartir el link mantiene el mismo filtro/página activos.

**Un solo `ProductForm` reutilizado en tres contextos**: crear desde `/products/new` (categoría por select), crear desde `/categories/:id/products/new` (categoría fija), y editar (categoría pre-seleccionada, pero editable). Evita mantener tres formularios casi idénticos.

**`ProtectedRoute` vs `RoleRoute` como componentes separados**, en vez de una única ruta con un prop `role?`. `ProtectedRoute` solo verifica sesión; `RoleRoute` verifica sesión y rol. Mantenerlos separados deja explícito en el propio `App.tsx` qué rutas necesitan qué nivel de acceso, sin tener que leer props para saberlo.

**Sin parameter properties ni `enum` en las clases/tipos** (`ApiError`, `UserRole`). El proyecto tiene activo `erasableSyntaxOnly` en el `tsconfig`, que exige que todo lo que TypeScript borra al compilar sea *solo* anotaciones de tipo, sin generar código en runtime. Por eso `UserRole` es un `type` con unión de strings (`'admin' | 'user'`) en vez de un `enum`, y las clases de error declaran sus propiedades explícitamente en vez de usar el atajo `constructor(public x: number)`.

**El estado de "favorito" se calcula en el frontend**, no viene en `GET /products/:id`. Se confirmó revisando el backend real que ese endpoint no incluye esa información; `FavoriteButton` cruza el `productId` actual contra `GET /favorites` para saber si mostrarse marcado o no.

## Pendiente / fuera de alcance

- Manejo de refresh token (la API no expone ese endpoint)
- Tests automatizados
- Estilos (el foco del simulacro fue la integración con la API, no el diseño visual)