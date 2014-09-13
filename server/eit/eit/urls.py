from django.conf.urls import patterns, include, url
from django.contrib import admin
from cards.api import CardResource

card_resource = CardResource()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'eit.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(card_resource.urls)),
)
