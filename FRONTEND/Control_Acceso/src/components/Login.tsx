import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

interface LoginProps {
    onLogin: (username: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState<string>('');
    const [numeroIdentificacion, setNumeroIdentificacion] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (nombre && numeroIdentificacion) {
            try {
                const response = await fetch('http://localhost:8000/login/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nombre,
                        numero_identificacion: numeroIdentificacion,
                    }),
                });

                const data = await response.json();

                if (data.existe) {
                    onLogin(nombre, numeroIdentificacion);

                    toast.success('El residente ingresado existe.', {
                        position: 'top-right'
                    });
                    navigate('/inicio');
                    setError('');
                    localStorage.setItem('existe', JSON.stringify(data.existe));
                } else {
                    toast.error('Credenciales incorrectas.', {
                        position: 'top-right'
                    });
                    setError('Credenciales incorrectas.');
                }
            } catch (err) {
                setError('Error al comunicarse con el servidor.');
                console.error(err);
            }
        } else {
            setError('Por favor, complete todos los campos.');
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-200">
            <div className="rounded-lg shadow-md w-96 bg-white p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                            Nombre de Usuario
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="numeroIdentificacion" className="block text-sm font-medium text-gray-700">
                            Número de Identificación
                        </label>
                        <input
                            type="text"
                            id="numeroIdentificacion"
                            value={numeroIdentificacion}
                            onChange={(e) => setNumeroIdentificacion(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <div className='flex space-x-2 justify-between'>
                        <button
                            type="submit"
                            className="w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition">
                            Iniciar Sesión
                        </button>
                        <button
                            className="w-full bg-green-300 text-white p-2 rounded-md hover:bg-green-500 transition"
                            onClick={() => { navigate('/registrar_residente') }}>
                            Registrar Residente
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
