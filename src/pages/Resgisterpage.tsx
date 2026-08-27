import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { errorMessage } from '../services/Errors';

export function RegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

    try {
        await register({ name, email, password });
            navigate('/');
        } catch (err) {
            setError(errorMessage(err));
        } finally {
            setLoading(false);
    }
    }

    return (
        <form onSubmit={handleSubmit}>
        <h1>Crear cuenta</h1>
    
        {error && <p role="alert">{error}</p>}
    
        <label>
            Nombre
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            minLength={2}
            required
            />
        </label>
    
        <label>
            Email
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </label>
    
        <label>
            Contraseña
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
            />
        </label>
    
        <button type="submit" disabled={loading}>
            {loading ? 'Creando cuenta...' : 'Registrarme'}
        </button>
    </form>
);
}