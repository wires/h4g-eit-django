# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Card',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('kind', models.PositiveIntegerField(choices=[(1, b'Action'), (2, b'Issue'), (3, b'Topic')])),
                ('name', models.CharField(max_length=256)),
                ('short_description', models.CharField(max_length=1024)),
                ('description', models.TextField()),
                ('description_html', models.TextField(editable=False)),
                ('votes', models.PositiveIntegerField()),
                ('actions', models.PositiveIntegerField()),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Label',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=128)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('slug', models.CharField(max_length=128)),
                ('name', models.CharField(max_length=128)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='card',
            name='cards',
            field=models.ManyToManyField(related_name=b'related', to='cards.Tag'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='card',
            name='creator',
            field=models.ForeignKey(related_name=b'cards', to=settings.AUTH_USER_MODEL),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='card',
            name='labels',
            field=models.ManyToManyField(related_name=b'cards', to='cards.Label'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='card',
            name='watchers',
            field=models.ManyToManyField(related_name=b'watched_cards', to=settings.AUTH_USER_MODEL),
            preserve_default=True,
        ),
    ]
