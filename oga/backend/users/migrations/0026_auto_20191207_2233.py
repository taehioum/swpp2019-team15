# Generated by Django 2.2.6 on 2019-12-07 22:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0025_auto_20191207_2230'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='answer',
            options={'ordering': ['-publish_date_time']},
        ),
        migrations.AlterModelOptions(
            name='question',
            options={'ordering': ['-publish_date_time']},
        ),
    ]
