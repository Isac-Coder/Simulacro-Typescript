import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '../../hooks/Usemulation';
import type { Category, CreateCategoryDto } from '../../types';


export function CreateCategoryPage() {
  const navigate = useNavigate();
  const { mutate, loading, error } = useMutation<Category, CreateCategoryDto>('POST', '/categories');
 
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
 
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const created = await mutate({ name, description: description || undefined });
    if (created) navigate(`/categories/${created.id}`);
  }
 
  return (
    <form onSubmit={handleSubmit}>
      <h1>Crear categoría</h1>
 
      {/* Este error cubre el 409 del backend cuando el nombre ya existe */}
      {error && <p role="alert">{error}</p>}
 
      <label>
        Nombre
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
 
      <label>
        Descripción (opcional)
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
 
      <button type="submit" disabled={loading}>
        {loading ? 'Creando...' : 'Crear categoría'}
      </button>
    </form>
  );
}
