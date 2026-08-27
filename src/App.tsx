import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/Loginpage";
import { RegisterPage } from "./pages/Resgisterpage";
import { CategoriesPage } from "./pages/Categories/CategoriesPage";
import { CategoryDetailPage } from "./pages/Categories/CategoryDetailPage";
import { ProductsPage } from "./pages/Products/Productspage";
import { ProductDetailPage } from "./components/Producteditpage";
import { ProtectedRoute } from "./routes/ProtecdRoute";
import { FavoritesPage } from "./pages/FavoritesPage";
import { RoleRoute } from "./routes/RoleRoute";
import { Layout } from "./components/Layoutt";
import { ProductCreatePage } from "./components/Productcreatepage";
import { CreateCategoryPage } from "./pages/Categories/CreateCategoryPage";
import { NotFoundPage } from "./pages/NotFoundPage";


function HomePage() {
  return <h1>Inicio</h1>;
}
 
export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Rutas públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:id" element={<CategoryDetailPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
 
        {/* Requiere sesión, cualquier rol */}
        <Route element={<ProtectedRoute/>}>
          <Route path="/products/new" element={<ProductDetailPage />} />
          <Route path="/categories/:categoryId/products/new" element={<ProductCreatePage />} />
          <Route path="/products/:id/edit" element={<ProductDetailPage/>} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
 
        {/* Requiere sesión y rol admin */}
        <Route element={<RoleRoute allowedRoles={['admin']} />}>
          <Route path="/categories/new" element={<CreateCategoryPage />} />
        </Route>
 
        {/* Cualquier ruta que no matchee ninguna de las anteriores */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}