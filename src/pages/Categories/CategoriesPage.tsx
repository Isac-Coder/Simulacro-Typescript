import { Link } from 'react-router-dom';
import type { Category } from '../../types';
import { useFetch } from '../../hooks/Usefetch';

export function CategoriesPage() {
  const { data: categories, loading, error } = useFetch<Category[]>('/categories');
 
  if (loading) return <p>Cargando categorías...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!categories || categories.length === 0) return <p>Todavía no hay categorías.</p>;
 
  return (
    <div>
      <h1>Categorías</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/categories/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}