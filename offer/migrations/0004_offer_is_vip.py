# Generated by Django 4.2.5 on 2023-10-10 15:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('offer', '0003_alter_offer_creation_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='offer',
            name='is_vip',
            field=models.BooleanField(default=False),
        ),
    ]
