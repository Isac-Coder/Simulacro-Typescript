import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '../hooks/Usemulation';
import { ProductForm } from './ProductForm';
import type { Product, UpdateProductDto } from '../types';
import { useFetch } from '../hooks/Usefetch';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
 
  const { data: product, loading, error } = useFetch<Product>(id ? `/products/${id}` : null);
  const {
    mutate: deleteProduct,
    loading: deleting,
    error: deleteError,
  } = useMutation<void>('DELETE', `/products/${id}`);
 
  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!product) return null;
 
  async function handleDelete() {
    const confirmed = window.confirm('¿Eliminar este producto? No se puede deshacer.');
    if (!confirmed) return;
 
    await deleteProduct();
    navigate('/products');
  }
 
  return (
    <div>
      <h1>{product.name}</h1>
      {product.description && <p>{product.description}</p>}
      <p>Precio: ${product.price}</p>
      <p>Stock: {product.stock}</p>
      <p>
        Categoría: <Link to={`/categories/${product.category.id}`}>{product.category.name}</Link>
      </p>
 
      <div>
        {product.images.map((image) => (
          <img
            key={image.id}
            src={image.url}
            alt={product.name}
            style={{ maxWidth: 150, marginRight: 8 }}
            // Una URL rota no debe romper el layout: si falla, ocultamos esa imagen puntual.
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ))}
      </div>
 
      {user && (
        <div>
          <FavoriteButton productId={product.id} />
          <Link to={`/products/${product.id}/edit`}>Editar</Link>
          {deleteError && <p role="alert">{deleteError}</p>}
          <button onClick={handleDelete} disabled={deleting}>
            {deleting ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      )}
    </div>
  );
}