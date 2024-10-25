import Sidebar from "./sidebar";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

interface InicioProps {
    contenido: React.ReactNode;
}

export default function Inicio({ contenido }: InicioProps) {
    const navigate = useNavigate();
    const existe = JSON.parse(localStorage.getItem('existe')); // Llamamos la variable del localStorage

    useEffect(() => {
        if (existe) {
        } else {
            toast.error('El residente no está autenticado.', {
                position: 'top-right'
            });
            navigate('/');
        }
    }, [existe, navigate]);

    return (
        <div className="h-screen min-h-screen flex flex-col">
            <div className="bg-indigo-600 h-16 flex justify-between px-5 items-center">
                <p className="text-xl font-bold text-white p-2 rounded-md">Control de acceso</p>
                <button className="text-white p-2" onClick={() => {

                    localStorage.removeItem('existe'); // Eliminamos la variable del localStorage

                    navigate('/');
                    toast.success('Se cerró correctamente.', {
                        position: 'top-right'
                    });
                }}>
                    Cerrar Sesión
                </button>
            </div>
            <div className='flex flex-col flex-grow lg:flex-row'>
                <div className='lg:w-80'>
                    <Sidebar />
                </div>
                <div className='flex flex-col bg-gray-200 w-full'>
                    <div className='flex-grow p-5 overflow-y-auto h-[calc(100vh-160px)]'>
                        {contenido}
                    </div>
                    <div className='flex justify-end items-center bg-gray-300 text-black text-opacity-50 text-sm h-14 py-2 text-end px-5'>
                        <p>
                            Copyright© 2024 Prueba Práctica de React. Todos los Derechos Reservados XD.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
