import { useEffect, useState } from 'react';

interface Residente {
    id: number;
    nombre: string;
    numero_identificacion: string;
    placa_vehiculo: string;
    fecha_creacionTekef: string;
}

export default function ListaRecidentes() {
    const [residentes, setResidentess] = useState<Residente[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResidentess = async () => {
            try {
                const response = await fetch('http://localhost:8000/residentes/');
                if (!response.ok) {
                    throw new Error('Error en la carga de datos');
                }
                const data = await response.json();
                setResidentess(data);
            } catch (err) {
                setError(err.message);
                // No se porque de este error en el err pero si funca xdddd
            } finally {
                setLoading(false);
            }
        };

        fetchResidentess();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex items-center justify-center">
            <div className="overflow-x-auto w-full max-w-4xl bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center p-4">Lista de Residentes</h2>

                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Número de Identificación</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Placa del Vehículo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Creación</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {residentes.map((residente) => (
                            <tr key={residente.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{residente.nombre}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{residente.numero_identificacion}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{residente.placa_vehiculo}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {new Date(residente.fecha_creacionTekef).toLocaleDateString()} {' '}
                                    {new Date(residente.fecha_creacionTekef).toLocaleTimeString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
