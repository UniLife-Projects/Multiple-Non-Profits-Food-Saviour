# Generated by Django 4.1.3 on 2023-03-03 05:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="users",
            name="last_login",
            field=models.CharField(max_length=50, null=True),
        ),
    ]