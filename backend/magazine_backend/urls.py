from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ArticleListView,
    ArticleDetailView,
    TrendingArticleList,
    TrendingArticleViewSet,
    WhatToWatchDetailView,
    get_article,
    HomepageListView,
    HomepageDetailView,
    MoviesDetailView,
    MoviesListView,

    TVShowsDetailView,
    TVShowsListView,
    ArticleSearchView,
    ArticleList,
    WhatToWatchListView,  # ✅ Added missing import
)

# Router for ViewSets
router = DefaultRouter()
router.register(r"trending-articles", TrendingArticleViewSet, basename="trending-articles")

urlpatterns = [
    # Article API
    path("api/articles/<slug:slug>/", get_article, name="get_article"),
    path("articles/", ArticleListView.as_view(), name="article-list"),
    path("article-list/", ArticleList.as_view(), name="article-list-filter"),
    path("articles/detail/<slug:slug>/", ArticleDetailView.as_view(), name="article-detail"),

    path("what-to-watch/", WhatToWatchListView.as_view(), name="what-to-watch"),
 # What To Watch APIpath("what-to-watch/", WhatToWatchListView.as_view(), name="what-to-watch"),

    path("what-to-watch/<int:id>/", WhatToWatchDetailView.as_view(), name="what-to-watch-detail"),
    path("tv-shows/", TVShowsListView.as_view(), name="tv-show"),
    path("tv-shows/<int:id>/", TVShowsDetailView.as_view(), name="tv-show-detail"),

    path("homepage/", HomepageListView.as_view(), name="homepage"),
    path("homepage/<int:id>/", HomepageDetailView.as_view(), name="homepage-detail"),

    path("movies/", MoviesListView.as_view(), name="movies"),
    path("movies/<int:id>/", MoviesDetailView.as_view(), name="movies-detail"),
    # Search endpoint
    path("api/search/", ArticleSearchView.as_view(), name="article-search"),


    # Trending Articles
    path("trending-articles/", TrendingArticleList.as_view(), name="trending-articles"),
    path("trending-articles/<int:id>/", TrendingArticleViewSet.as_view({'get': 'retrieve'}), name="trending-detail"),

    # Router-based endpoints
    path("api/", include(router.urls)),
]
