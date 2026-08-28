# React + TypeScript + Vite

# *Estructura principal*

```bash
src/
├── types/          # interfaces del dominio (User, Category, Product, Auth...)
├── services/        # capa HTTP: request<T>, errores, token storage
├── hooks/            # useFetch (GET) y useMutation (POST/PATCH/DELETE)
├── context/         # AuthContext: sesión, login, register, logout
├── routes/          # ProtectedRoute y RoleRoute
├── components/  # Navbar, Layout, ProductForm, FavoriteButton
└── pages/            # una página por vista
```
