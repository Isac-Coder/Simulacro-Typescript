import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { Category, PaginatedResponse, Product } from '../../types';
import { useFetch } from '../../hooks/Usefetch';


export function CategoryDetailPage(){
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();

    const {
        data: category,
        loading: loadingCategory,
        error: categoryError
    } = useFetch<Category>( id ? `/categories/${id}` : null);

    const {
    data: products,
    loading: loadingProducts,
    error: productsError,
  } = useFetch<PaginatedResponse<Product>>(id ? `/products?categoryId=${id}` : null);
 
  if (loadingCategory) return <p>Cargando categoría...</p>;
  if (categoryError) return <p role="alert">{categoryError}</p>;
  if (!category) return null;
 
  return (
    <div>
      <h1>{category.name}</h1>
      {category.description && <p>{category.description}</p>}
 
      {/* Visible para cualquier usuario autenticado, sin importar el rol */}
      {user && (
        <Link to={`/categories/${category.id}/products/new`}>
          Agregar producto a esta categoría
        </Link>
      )}
 
      <h2>Productos</h2>
 
      {loadingProducts && <p>Cargando productos...</p>}
      {productsError && <p role="alert">{productsError}</p>}
      {!loadingProducts && !productsError && products?.data.length === 0 && (
        <p>Esta categoría todavía no tiene productos.</p>
      )}
 
      <ul>
        {products?.data.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}