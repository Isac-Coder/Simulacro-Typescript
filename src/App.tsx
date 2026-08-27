import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtecdRoute';
import { RoleRoute } from './routes/RoleRoute';
import { LoginPage } from './pages/Loginpage';
import { RegisterPage } from './pages/Resgisterpage';

function HomePage() {
  return <h1>Inicio</h1>;
}
function FavoritesPage() {
  return <h1>Mis favoritos</h1>;
}
function CreateCategoryPage() {
  return <h1>Crear categoría (solo admin)</h1>;
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/favorites" element={<FavoritesPage />} />
      </Route>

      <Route element={<RoleRoute allowedRoles={['admin']} />}>
        <Route path="/categories/new" element={<CreateCategoryPage />} />
      </Route>
    </Routes>
  );
}