import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
 
  async function handleLogout() {
    await logout();
    navigate('/login');
  }
 
  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/categories">Categorías</Link>
      <Link to="/products">Productos</Link>
 
      {user ? (
        <>
          <Link to="/favorites">Favoritos</Link>
          {user.role === 'admin' && <Link to="/categories/new">Crear categoría</Link>}
          <span>Hola, {user.name}</span>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </>
      ) : (
        <>
          <Link to="/login">Iniciar sesión</Link>
          <Link to="/register">Crear cuenta</Link>
        </>
      )}
    </nav>
  );
}