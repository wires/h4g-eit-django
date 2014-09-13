# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='card',
            name='actions',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='card',
            name='cards',
            field=models.ManyToManyField(related_name=b'related', null=True, to=b'cards.Tag', blank=True),
        ),
        migrations.AlterField(
            model_name='card',
            name='labels',
            field=models.ManyToManyField(related_name=b'cards', null=True, to=b'cards.Label', blank=True),
        ),
        migrations.AlterField(
            model_name='card',
            name='votes',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
