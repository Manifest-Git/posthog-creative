# Generated by Django 3.2.16 on 2023-01-18 12:56

from django.db import migrations, models

import posthog.models.utils


class Migration(migrations.Migration):
    atomic = False

    dependencies = [
        ("posthog", "0291_create_person_override_model"),
    ]

    operations = [
        migrations.AddField(
            model_name="propertydefinition",
            name="group_type_index",
            field=models.PositiveSmallIntegerField(null=True),
        ),
        migrations.RunSQL(
            'ALTER TABLE "posthog_propertydefinition" ADD COLUMN "type" smallint DEFAULT 1 NOT NULL CHECK ("type" >= 0) -- not-null-ignore',
            'ALTER TABLE "posthog_propertydefinition" DROP COLUMN "type"',
            state_operations=[
                migrations.AddField(
                    model_name="propertydefinition",
                    name="type",
                    field=models.PositiveSmallIntegerField(
                        choices=[(1, "event"), (2, "person"), (3, "group")], default=1
                    ),
                ),
            ],
        ),
        migrations.AddConstraint(
            model_name="propertydefinition",
            constraint=models.CheckConstraint(
                check=models.Q(
                    models.Q(("type", 3), _negated=True),
                    ("group_type_index__isnull", False),
                    _connector="OR",
                ),
                name="group_type_index_set",
            ),
        ),
        migrations.AddConstraint(
            model_name="propertydefinition",
            constraint=posthog.models.utils.UniqueConstraintByExpression(
                concurrently=True,
                expression="(team_id, name, type, coalesce(group_type_index, -1))",
                name="posthog_propertydefinition_uniq",
            ),
        ),
    ]