# Generated by Django 2.2.28 on 2022-05-27 14:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('socks', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='docs',
            name='creationDate',
            field=models.DateTimeField(null=True),
        ),
    ]
