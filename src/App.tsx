import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtecdRoute';
import { RoleRoute } from './routes/RoleRoute';
import { LoginPage } from './pages/Loginpage';
import { RegisterPage } from './pages/Resgisterpage';
import { CategoriesPage } from './pages/Categories/CategoriesPage';
import { CategoryDetailPage } from './pages/Categories/CategoryDetailPage';
import { CreateCategoryPage } from './pages/Categories/CreateCategoryPage';
import { ProductsPage } from './pages/Products/Productspage';
import { ProductDetailPage } from './pages/Products/Productdetailpage';

function HomePage() {
  return <h1>Inicio</h1>;
}
function FavoritesPage() {
  return <h1>Mis favoritos</h1>;
}
 
export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/categories/:id" element={<CategoryDetailPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/favorites" element={<FavoritesPage />} />
      </Route>
 
      <Route element={<RoleRoute allowedRoles={['admin']} />}>
        <Route path="/categories/new" element={<CreateCategoryPage />} />
      </Route>

      <Route element={<RoleRoute allowedRoles={['admin']} />}>
        <Route path="/categories/new" element={<CreateCategoryPage />} />
      </Route>

    </Routes>
  );
}