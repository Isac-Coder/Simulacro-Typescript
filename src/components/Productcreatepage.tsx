import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '../hooks/Usemulation';
import { ProductForm } from './ProductForm';
import type { CreateProductDto, Product } from '../types';

export function ProductCreatePage() {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const navigate = useNavigate();
  const { mutate, loading, error } = useMutation<Product, CreateProductDto>('POST', '/products');
 
  async function handleSubmit(data: CreateProductDto) {
    const created = await mutate(data);
    if (created) navigate(`/products/${created.id}`);
  }
 
  return (
    <div>
      <h1>Crear producto</h1>
      <ProductForm
        fixedCategoryId={categoryId}
        submitLabel="Crear producto"
        loading={loading}
        error={error}
        onSubmit={handleSubmit}
      />
    </div>
  );
}