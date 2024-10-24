import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';

export default function CrearVisita() {
    const navigate = useNavigate()
    const [nombre, setNombre] = useState('');
    const [razonVisita, setRazonVisita] = useState('');
    const [numeroContacto, setNumeroContacto] = useState('');
    const [horaVisita, setHoraVisita] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const nuevaVisita = {
            nombre,
            razon_visita: razonVisita,
            numero_contacto: numeroContacto,
            hora_visita: horaVisita,
        };

        try {
            const response = await fetch('http://localhost:8000/visitantes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevaVisita),
            });

            if (!response.ok) {
                throw new Error('Error al agregar la visita: ' + response.statusText);
            }

            setSuccess('Visita agregada con éxito!');
            toast.success('Visita agregada con éxito!', {
                position: 'top-right'
            });

            setNombre('');
            setRazonVisita('');
            setNumeroContacto('');
            setHoraVisita('');
            setError('');
            navigate('/lista_visitas');
        } catch (err) {
            console.error('Error:', err);
            setError(err.message);
            // No se porque de este error en el err pero si funca xdddd
            setSuccess('');
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Agregar Visita</h2>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
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
                        <label htmlFor="razonVisita" className="block text-sm font-medium text-gray-700">Razón de la Visita</label>
                        <input
                            type="text"
                            id="razonVisita"
                            value={razonVisita}
                            onChange={(e) => setRazonVisita(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="numeroContacto" className="block text-sm font-medium text-gray-700">Número de Contacto</label>
                        <input
                            type="text"
                            id="numeroContacto"
                            value={numeroContacto}
                            onChange={(e) => setNumeroContacto(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="horaVisita" className="block text-sm font-medium text-gray-700">Hora</label>
                        <input
                            type="time"
                            id="horaVisita"
                            value={horaVisita}
                            onChange={(e) => setHoraVisita(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Agregar Visita
                    </button>
                </form>
            </div>
        </div>
    );
}
