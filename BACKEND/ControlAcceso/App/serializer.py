from rest_framework import serializers
from .models import Residente, Visitante, EstadisticasVisitas

class ResidenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Residente
        fields = '__all__'  # Serializamos todos los atributos

class VisitanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visitante
        fields = '__all__'


class EstadisticasVisitasSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadisticasVisitas
        fields = ['fecha_visita', 'numero_visitas', 'hora_pico', 'promedio_visitas_por_hora']
