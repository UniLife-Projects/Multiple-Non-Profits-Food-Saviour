# Generated by Django 4.1.3 on 2023-03-03 05:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0002_alter_users_last_login"),
    ]

    operations = [
        migrations.AlterField(
            model_name="users",
            name="last_login",
            field=models.DateTimeField(
                blank=True, null=True, verbose_name="last login"
            ),
        ),
    ]