# Generated by Django 3.1.1 on 2020-11-20 08:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userbio',
            name='bio',
            field=models.TextField(default='Hello, i am a user of BlogIt.', max_length=500),
        ),
    ]
