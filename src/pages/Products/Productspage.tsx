import { Link, useSearchParams } from 'react-router-dom';
import { useFetch } from '../../hooks/Usefetch';
import type { Category, PaginatedResponse, Product } from '../../types';

const LIMIT = 10;

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
 
  const search = searchParams.get('search') ?? '';
  const categoryId = searchParams.get('categoryId') ?? '';
  const page = Number(searchParams.get('page') ?? '1');
 
  const query = new URLSearchParams();
  query.set('page', String(page));
  query.set('limit', String(LIMIT));
  if (search) query.set('search', search);
  if (categoryId) query.set('categoryId', categoryId);
 
  const { data, loading, error } = useFetch<PaginatedResponse<Product>>(`/products?${query.toString()}`);
  const { data: categories } = useFetch<Category[]>('/categories');
 
  function updateParam(key: string, value: string) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) next.set(key, value);
      else next.delete(key);
      next.set('page', '1'); // cualquier cambio de filtro reinicia la paginación
      return next;
    });
  }
 
  function goToPage(newPage: number) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', String(newPage));
      return next;
    });
  }
 
  return (
    <div>
      <h1>Productos</h1>
 
      <input
        type="search"
        placeholder="Buscar productos..."
        value={search}
        onChange={(e) => updateParam('search', e.target.value)}
      />
 
      <select value={categoryId} onChange={(e) => updateParam('categoryId', e.target.value)}>
        <option value="">Todas las categorías</option>
        {categories?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
 
      <Link to="/products/new">Crear producto</Link>
 
      {loading && <p>Cargando productos...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && data?.data.length === 0 && <p>No se encontraron productos.</p>}
 
      <ul>
        {data?.data.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link> — ${product.price}
          </li>
        ))}
      </ul>
 
      {data && data.totalPages > 1 && (
        <div>
          <button disabled={page <= 1} onClick={() => goToPage(page - 1)}>
            Anterior
          </button>
          <span>
            {' '}
            Página {data.page} de {data.totalPages}{' '}
          </span>
          <button disabled={page >= data.totalPages} onClick={() => goToPage(page + 1)}>
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}