from django.conf import settings
from django.db import models

class Tag(models.Model):
    slug = models.CharField(max_length=128)
    name = models.CharField(max_length=128)


class Card(models.Model):
    KIND_ACTION = 1
    KIND_ISSUE  = 2
    KINDS = (
        (KIND_ACTION, "Action"),
        (KIND_ISSUE, "Issue"),
    )
    kind              = models.PositiveIntegerField(choices=KINDS)
    name              = models.CharField(max_length=256)
    short_description = models.CharField(max_length=1024)
    description       = models.TextField()
    description_html  = models.TextField(editable=False)
    creator           = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="cards")
    tags              = models.ManyToManyField(Tag, related_name="cards")
