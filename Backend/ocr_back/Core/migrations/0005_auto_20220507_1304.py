# Generated by Django 2.2.28 on 2022-05-07 13:04

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Core', '0004_auto_20220507_1235'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='birthday',
            field=models.DateField(default=datetime.datetime(2022, 5, 7, 13, 4, 9, 917331), null=True),
        ),
    ]
