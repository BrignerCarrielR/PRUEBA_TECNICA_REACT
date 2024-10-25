import { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';

// Registra todos los elementos de Chart.js
Chart.register(...registerables);

export default function Estadisticas() {
    const [estadisticas, setEstadisticas] = useState({
        totalVisitas: 0,
        horaPico: '',
        promedioVisitasPorHora: 0.0,
    });
    const [barChart, setBarChart] = useState(null);

    useEffect(() => {
        const fetchVisitantes = async () => {
            try {
                const response = await fetch('http://localhost:8000/visitantes/');
                if (!response.ok) throw new Error('Error al cargar los visitantes');

                const visitantes = await response.json();
                calcularEstadisticas(visitantes);
            } catch (error) {
                console.error(error);
            }
        };

        fetchVisitantes();
    }, []);
    // Para hacer el grafico me ayude
    const calcularEstadisticas = (visitantes) => {
        const totalVisitas = visitantes.length;
        const horas = {};

        visitantes.forEach((visitante) => {
            const hora = new Date(visitante.fecha_visita).getHours();
            horas[hora] = (horas[hora] || 0) + 1;
        });

        const horaPico = Object.keys(horas).reduce((a, b) => horas[a] > horas[b] ? a : b);
        const promedioVisitasPorHora = totalVisitas / (new Date().getHours() + 1);

        setEstadisticas({
            totalVisitas,
            horaPico: `${horaPico}:00 - ${parseInt(horaPico) + 1}:00`,
            promedioVisitasPorHora: promedioVisitasPorHora,
        });

        // Configura el gráfico
        if (barChart) {
            barChart.destroy();
        }

        const ctx = document.getElementById('barChart').getContext('2d');
        const newBarChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Total de Visitas', 'Hora Pico', 'Promedio por Hora'],
                datasets: [{
                    label: 'Cantidad',
                    data: [totalVisitas, parseInt(horaPico), promedioVisitasPorHora],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        setBarChart(newBarChart);
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100">
            <h2 className="text-3xl font-bold mb-6">Estadísticas de Visitas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {/* Tarjeta de Total de Visitas */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-xl font-semibold mb-2">Total de Visitas</h3>
                    <p className="text-3xl font-bold">{estadisticas.totalVisitas}</p>
                </div>

                {/* Tarjeta de Hora Pico */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-xl font-semibold mb-2">Hora Pico</h3>
                    <p className="text-3xl font-bold">{estadisticas.horaPico}</p>
                </div>

                {/* Tarjeta de Promedio de Visitas por Hora */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-xl font-semibold mb-2">Promedio por Hora</h3>
                    <p className="text-3xl font-bold">{estadisticas.promedioVisitasPorHora}</p>
                </div>
            </div>

            {/* Gráfico de Barras */}
            <div className="bg-white shadow-md rounded-lg p-6 mt-6 w-full max-w-6xl" style={{ height: '300px' }}>
                <h3 className="text-xl font-semibold mb-4">Gráfico de Estadísticas</h3>
                <canvas id="barChart" width="400" height="200" style={{ maxHeight: '200px' }}></canvas>
            </div>
        </div>
    );
}
