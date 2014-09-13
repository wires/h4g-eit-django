from django.contrib import admin

from .models import Card, Label, Tag

class CardAdmin(admin.ModelAdmin):
    pass



class LabelAdmin(admin.ModelAdmin):
    pass



class TagAdmin(admin.ModelAdmin):
    pass



admin.site.register(Card, CardAdmin)
admin.site.register(Label, LabelAdmin)
admin.site.register(Tag, TagAdmin)
