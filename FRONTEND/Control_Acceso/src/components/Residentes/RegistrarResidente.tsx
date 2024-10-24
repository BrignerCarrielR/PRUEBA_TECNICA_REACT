import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const RegistroResidente = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState<string>('');
    const [numeroIdentificacion, setNumeroIdentificacion] = useState<string>('');
    const [placaVehiculo, setPlacaVehiculo] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (nombre && numeroIdentificacion && placaVehiculo) {
            try {
                const response = await fetch('http://localhost:8000/residentes/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nombre,
                        numero_identificacion: numeroIdentificacion,
                        placa_vehiculo: placaVehiculo,
                    }),
                });

                if (response.ok) {
                    toast.success('Residente registrado correctamente.', {
                        position: 'top-right'
                    });
                    setSuccess('Residente registrado correctamente.');
                    setError('');
                    setNombre('');
                    setNumeroIdentificacion('');
                    setPlacaVehiculo('');
                    navigate('/');
                } else {
                    const errorData = await response.json();
                    setError(errorData.detail || 'Error al registrar el residente.');
                }
            } catch (err) {
                setError('Error de conexión, por favor intente de nuevo.');
            }
        } else {
            setError('Por favor, complete todos los campos.');
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-200">
            <div className="rounded-lg shadow-md w-96 bg-white p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Registrar Residente</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                            Nombre
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
                    <div className="mb-4">
                        <label htmlFor="placaVehiculo" className="block text-sm font-medium text-gray-700">
                            Placa del Vehículo
                        </label>
                        <input
                            type="text"
                            id="placaVehiculo"
                            value={placaVehiculo}
                            onChange={(e) => setPlacaVehiculo(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

                    <div className='flex space-x-2 justify-between'>
                        <button
                            type="submit"
                            className="w-full bg-green-300 text-white p-2 rounded-md hover:bg-green-500 transition"
                            onClick={() => { navigate('/') }}>
                            Volver
                        </button>
                        <button
                            type="submit"
                            className="w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition"
                        >
                            Registrar Residente
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistroResidente;
