# Generated by Django 5.2.3 on 2025-06-24 05:51

import users.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_remove_user_username_user_name_alter_user_role'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='user',
            managers=[
                ('objects', users.models.UserManager()),
            ],
        ),
    ]
