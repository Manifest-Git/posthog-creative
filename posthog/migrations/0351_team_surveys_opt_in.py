# Generated by Django 3.2.19 on 2023-09-20 14:40

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("posthog", "0350_add_notebook_text_content"),
    ]

    operations = [
        migrations.AddField(
            model_name="team",
            name="surveys_opt_in",
            field=models.BooleanField(blank=True, null=True),
        ),
    ]
