# Generated by Django 4.2.16 on 2024-10-24 20:52

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='estadisticasvisitas',
            name='visitante',
        ),
        migrations.AddField(
            model_name='visitante',
            name='hora_visita',
            field=models.TimeField(default=django.utils.timezone.now),
        ),
    ]
