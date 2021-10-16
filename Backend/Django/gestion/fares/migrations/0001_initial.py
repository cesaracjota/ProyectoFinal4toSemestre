# Generated by Django 3.1.7 on 2021-06-28 01:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='fares',
            fields=[
                ('fare_per_km', models.IntegerField()),
                ('minimum_fare', models.IntegerField()),
                ('minimun_distance', models.IntegerField()),
                ('waiting_fare', models.IntegerField()),
                ('type', models.CharField(default=None, max_length=30, primary_key=True, serialize=False)),
            ],
        ),
    ]
