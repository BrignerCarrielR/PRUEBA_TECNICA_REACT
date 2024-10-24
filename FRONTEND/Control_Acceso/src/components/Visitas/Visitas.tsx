import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'


interface Visitante {
    id: number;
    nombre: string;
    razon_visita: string;
    numero_contacto: string;
    fecha_visita: string; // O Date, si decides transformar los datos antes
}

export default function Visitas() {
    const navigate = useNavigate()
    const [visitantes, setVisitantes] = useState<Visitante[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchVisitantes = async () => {
        try {
            const response = await fetch('http://localhost:8000/visitantes/');
            if (!response.ok) {
                throw new Error('Error en la carga de datos: ' + response.statusText);
            }
            const data: Visitante[] = await response.json();
            setVisitantes(data);
        } catch (err) {
            console.error('Error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVisitantes();
    }, []);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex items-center justify-center">
            <div className="overflow-x-auto w-full max-w-4xl bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center p-4">Lista de Visitantes</h2>
                <button className='bg-indigo-500 font-bold text-white py-2 px-4 rounded-lg m-2' onClick={() => { navigate('/agregar_visita') }}>Nueva Visita</button>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Razón Visita</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Número de Contacto</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {visitantes.map((visitante) => (
                            <tr key={visitante.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{visitante.nombre}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{visitante.razon_visita}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{visitante.numero_contacto}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(visitante.fecha_visita).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(visitante.fecha_visita).toLocaleTimeString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
