# Generated by Django 4.2.16 on 2024-10-24 20:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Residente',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('numero_identificacion', models.CharField(max_length=50, unique=True)),
                ('placa_vehiculo', models.CharField(max_length=20, unique=True)),
                ('fecha_creacionTekef', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Visitante',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('razon_visita', models.TextField()),
                ('numero_contacto', models.CharField(max_length=15)),
                ('fecha_visita', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='EstadisticasVisitas',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_visita', models.DateField()),
                ('numero_visitas', models.IntegerField(default=0)),
                ('hora_pico', models.TimeField()),
                ('promedio_visitas_por_hora', models.FloatField(default=0.0)),
                ('visitante', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='estadisticas', to='App.visitante')),
            ],
        ),
    ]
