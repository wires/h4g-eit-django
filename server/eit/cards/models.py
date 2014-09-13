from django.conf import settings
from django.db import models

class Tag(models.Model):
    slug = models.CharField(max_length=128)
    name = models.CharField(max_length=128)

class Label(models.Model):
    name = models.CharField(max_length=128)

class Card(models.Model):
    KIND_ACTION = 1
    KIND_ISSUE  = 2
    KIND_TOPIC  = 3
    KINDS = (
        (KIND_ACTION, "Action"),
        (KIND_ISSUE,  "Issue"),
        (KIND_TOPIC,  "Topic"),
    )
    kind              = models.PositiveIntegerField(choices=KINDS)
    name              = models.CharField(max_length=256)
    
    short_description = models.CharField(max_length=1024)
    description       = models.TextField()
    description_html  = models.TextField(editable=False)
    votes             = models.PositiveIntegerField(default=0)
    actions           = models.PositiveIntegerField(default=0)

    labels            = models.ManyToManyField(Label, related_name="cards", blank=True, null=True)
    cards             = models.ManyToManyField(Tag, related_name="related", blank=True, null=True)
    
    creator           = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="cards")
    watchers          = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="watched_cards")
    
    updated_at        = models.DateTimeField(auto_now=True)
    created_at        = models.DateTimeField(auto_now_add=True)
     

