import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '../hooks/Usemulation';
import { ProductForm } from './ProductForm';
import type { Product, UpdateProductDto } from '../types';
import { useFetch } from '../hooks/Usefetch';

export function ProductEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
 
  const {
    data: product,
    loading: loadingProduct,
    error: loadError,
  } = useFetch<Product>(id ? `/products/${id}` : null);
 
  const {
    mutate,
    loading: saving,
    error: saveError,
  } = useMutation<Product, UpdateProductDto>('PATCH', `/products/${id}`);
 
  if (loadingProduct) return <p>Cargando producto...</p>;
  if (loadError) return <p role="alert">{loadError}</p>;
  if (!product) return null;
 
  async function handleSubmit(data: UpdateProductDto) {
    const updated = await mutate(data);
    if (updated) navigate(`/products/${updated.id}`);
  }
 
  return (
    <div>
      <h1>Editar producto</h1>
      {/* Sin fixedCategoryId: en edición sí se puede cambiar de categoría,
          el select viene pre-seleccionado con product.categoryId */}
      <ProductForm
        initialValues={product}
        submitLabel="Guardar cambios"
        loading={saving}
        error={saveError}
        onSubmit={handleSubmit}
      />
    </div>
  );
}