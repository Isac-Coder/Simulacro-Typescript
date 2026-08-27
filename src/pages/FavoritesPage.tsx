import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/Usefetch';
import { useMutation } from '../hooks/Usemulation';
import type { Product } from '../types';

export function FavoritesPage() {
  const { data: favorites, loading, error, refetch } = useFetch<Product[]>('/favorites');
 
  if (loading) return <p>Cargando favoritos...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!favorites || favorites.length === 0) return <p>Todavía no tienes productos favoritos.</p>;
 
  return (
    <div>
      <h1>Mis favoritos</h1>
      <ul>
        {favorites.map((product) => (
          <FavoriteItem key={product.id} product={product} onRemoved={refetch} />
        ))}
      </ul>
    </div>
  );
}
 
function FavoriteItem({ product, onRemoved }: { product: Product; onRemoved: () => void }) {
  const { mutate, loading, error } = useMutation<void>('DELETE', `/favorites/${product.id}`);
 
  async function handleRemove() {
    await mutate();
    onRemoved();
  }
 
  return (
    <li>
      <Link to={`/products/${product.id}`}>{product.name}</Link> — ${product.price}
      {error && <p role="alert">{error}</p>}
      <button onClick={handleRemove} disabled={loading}>
        {loading ? 'Quitando...' : 'Quitar'}
      </button>
    </li>
  );
}