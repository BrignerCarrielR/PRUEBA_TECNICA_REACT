from django.db import models
from django.utils import timezone

class Residente(models.Model):
    nombre = models.CharField(max_length=100)
    numero_identificacion = models.CharField(max_length=50, unique=True)
    placa_vehiculo = models.CharField(max_length=20, unique=True)
    fecha_creacionTekef = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre


class Visitante(models.Model):
    nombre = models.CharField(max_length=100)
    razon_visita = models.TextField()
    numero_contacto = models.CharField(max_length=15)
    fecha_visita = models.DateTimeField(auto_now_add=True)
    hora_visita = models.TimeField(default=timezone.now)

    def __str__(self):
        return self.nombre


class EstadisticasVisitas(models.Model):
    fecha_visita = models.DateField()
    numero_visitas = models.IntegerField(default=0)
    hora_pico = models.TimeField()
    promedio_visitas_por_hora = models.FloatField(default=0.0)

    def __str__(self):
        return f"Estadísticas del {self.fecha_visita}"
