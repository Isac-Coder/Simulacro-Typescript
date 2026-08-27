import { useFetch } from '../hooks/Usefetch';
import { useMutation } from '../hooks/Usemulation';
import type { Product } from '../types';

interface FavoriteButtonProps {
  productId: string;
}
 
export function FavoriteButton({ productId }: FavoriteButtonProps) {
  const { data: favorites, refetch } = useFetch<Product[]>('/favorites');
 
  const { mutate: addFavorite, loading: adding, error: addError } = useMutation<Product>(
    'POST',
    `/favorites/${productId}`,
  );
  const { mutate: removeFavorite, loading: removing, error: removeError } = useMutation<void>(
    'DELETE',
    `/favorites/${productId}`,
  );
 
  const isFavorite = favorites?.some((product) => product.id === productId) ?? false;
  const loading = adding || removing;
  const error = addError ?? removeError;
 
  async function toggle() {
    if (isFavorite) {
      await removeFavorite();
    } else {
      await addFavorite();
    }
    refetch(); // vuelve a pedir /favorites para reflejar el nuevo estado
  }
 
  return (
    <div>
      {error && <p role="alert">{error}</p>}
      <button onClick={toggle} disabled={loading}>
        {isFavorite ? '★ Quitar de favoritos' : '☆ Agregar a favoritos'}
      </button>
    </div>
  );
}
 