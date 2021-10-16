# Generated by Django 3.2.3 on 2021-06-09 19:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workers', '0004_alter_worker_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='worker',
            name='photo',
            field=models.ImageField(default='photos/user.png', upload_to='', verbose_name='Uploaded image'),
        ),
        migrations.AlterField(
            model_name='worker',
            name='trips',
            field=models.IntegerField(default=0),
        ),
    ]
