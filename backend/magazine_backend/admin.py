from django.contrib import admin
from django.contrib import admin
from .models import TrendingArticle,WhatToWatchArticle,TVShowsArticle,HomepageArticle,MoviesArticle
admin.site.register(WhatToWatchArticle)
admin.site.register(TrendingArticle)
admin.site.register(TVShowsArticle)
admin.site.register(MoviesArticle)
admin.site.register(HomepageArticle)



