import { useState } from 'react';
import type { FormEvent } from 'react';
import { useFetch } from '../hooks/Usefetch';
import type { Category, CreateProductDto, Product } from '../types';

interface ProductFormProps {
  initialValues?: Product;
  fixedCategoryId?: string;
  submitLabel: string;
  loading: boolean;
  error: string | null;
  onSubmit: (data: CreateProductDto) => void;
}
 

export function ProductForm({
  initialValues,
  fixedCategoryId,
  submitLabel,
  loading,
  error,
  onSubmit,
}: ProductFormProps) {
  const [name, setName] = useState(initialValues?.name ?? '');
  const [description, setDescription] = useState(initialValues?.description ?? '');
  const [price, setPrice] = useState(initialValues ? String(initialValues.price) : '');
  const [stock, setStock] = useState(initialValues ? String(initialValues.stock) : '');
  const [categoryId, setCategoryId] = useState(initialValues?.categoryId ?? fixedCategoryId ?? '');
  const [imagesText, setImagesText] = useState(
    initialValues
      ? [...initialValues.images]
          .sort((a, b) => a.order - b.order)
          .map((image) => image.url)
          .join('\n')
      : '',
  );
 
  // Solo se piden las categorías si hay que mostrar el <select>.
  const { data: categories } = useFetch<Category[]>(fixedCategoryId ? null : '/categories');
 
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      name,
      description: description || undefined,
      price: Number(price),
      stock: Number(stock),
      categoryId,
      images: imagesText
        .split('\n')
        .map((url) => url.trim())
        .filter(Boolean),
    });
  }
 
  return (
    <form onSubmit={handleSubmit}>
      {error && <p role="alert">{error}</p>}
 
      <label>
        Nombre
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
 
      <label>
        Descripción
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
 
      <label>
        Precio
        <input
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
 
      <label>
        Stock
        <input
          type="number"
          min="0"
          step="1"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
      </label>
 
      {fixedCategoryId ? (
        <p>Se creará dentro de esta categoría.</p>
      ) : (
        <label>
          Categoría
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
            <option value="" disabled>
              Selecciona una categoría
            </option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
      )}
 
      <label>
        URLs de imágenes (una por línea, opcional)
        <textarea value={imagesText} onChange={(e) => setImagesText(e.target.value)} />
      </label>
 
      <button type="submit" disabled={loading}>
        {loading ? 'Guardando...' : submitLabel}
      </button>
    </form>
  );
}