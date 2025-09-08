from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from rest_framework import generics, viewsets
from .models import WhatToWatchArticle,MoviesArticle,HomepageArticle

from .models import Article, TrendingArticle
from .serializers import ArticleSerializer, TrendingArticleSerializer,HomepageSerializer,MoviesSerializer


# ✅ Get a single article by slug (works with React ArticlePage)
@api_view(['GET'])
def get_article(request, slug):
    article = get_object_or_404(Article, slug=slug)
    serializer = ArticleSerializer(article)
    return Response(serializer.data)


# ✅ List all articles with optional filtering by article_link
class ArticleList(generics.ListAPIView):
    serializer_class = ArticleSerializer

    def get_queryset(self):
        queryset = Article.objects.all()
        article_link = self.request.query_params.get('article_link')
        if article_link:
            queryset = queryset.filter(slug=article_link)
        return queryset


# ✅ List all articles (ordered)
class ArticleListView(ListAPIView):
    queryset = Article.objects.all().order_by('-created_at')
    serializer_class = ArticleSerializer


# ✅ Article detail by slug
class ArticleDetailView(RetrieveAPIView):
    lookup_field = 'slug'
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


# ✅ Trending article list
class TrendingArticleList(generics.ListAPIView):
    queryset = TrendingArticle.objects.all()
    serializer_class = TrendingArticleSerializer


# ✅ Trending article detail
class TrendingArticleViewSet(viewsets.ModelViewSet):
    queryset = TrendingArticle.objects.all()
    serializer_class = TrendingArticleSerializer
    lookup_field = "id"
from rest_framework import viewsets, filters
from .models import Article
from .serializers import ArticleSerializer

class ArticleSearchView(generics.ListAPIView):
    queryset = Article.objects.all().order_by('-created_at')
    serializer_class = ArticleSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['headline']  # ✅ Search by headline

from rest_framework.views import APIView
# from rest_framework.response import Response
# from .models import WhatToWatchArticle

from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import WhatToWatchArticle,TVShowsArticle
from .serializers import WhatToWatchSerializer,TVShowsSerializer

class WhatToWatchListView(ListAPIView):
    queryset = WhatToWatchArticle.objects.all()
    serializer_class = WhatToWatchSerializer

class WhatToWatchDetailView(RetrieveAPIView):
    queryset = WhatToWatchArticle.objects.all()
    serializer_class = WhatToWatchSerializer
    lookup_field = 'id'

class TVShowsListView(ListAPIView):
    queryset = TVShowsArticle.objects.all()
    serializer_class = TVShowsSerializer

class TVShowsDetailView(RetrieveAPIView):
    queryset = TVShowsArticle.objects.all()
    serializer_class = TVShowsSerializer
    lookup_field = 'id'



class MoviesListView(ListAPIView):
    queryset = MoviesArticle.objects.all()
    serializer_class = TVShowsSerializer

class MoviesDetailView(RetrieveAPIView):
    queryset = MoviesArticle.objects.all()
    serializer_class = TVShowsSerializer
    lookup_field = 'id'


class HomepageListView(ListAPIView):
    queryset = HomepageArticle.objects.all()
    serializer_class = TVShowsSerializer

class HomepageDetailView(RetrieveAPIView):
    queryset = HomepageArticle.objects.all()
    serializer_class = TVShowsSerializer
    lookup_field = 'id'

from rest_framework.views import APIView
from rest_framework.response import Response
# from .models import TrendingArticle, WhatToWatch, TvShow, HomeArticle, Movie

class ArticleSearchView(APIView):
    def get(self, request):
        query = request.GET.get("q", "")
        results = []

        if query:
            # Example: search titles
            trending = TrendingArticle.objects.filter(title__icontains=query)
            watch = WhatToWatchArticle.objects.filter(title__icontains=query)
            tvshows = TVShowsArticle.objects.filter(title__icontains=query)
            home = HomepageArticle.objects.filter(title__icontains=query)
            movies = MoviesArticle.objects.filter(title__icontains=query)

            # Normalize results
            for item in trending:
                results.append({"id": item.id, "title": item.title, "type": "trending"})
            for item in watch:
                results.append({"id": item.id, "title": item.title, "type": "watch"})
            for item in tvshows:
                results.append({"id": item.id, "title": item.title, "type": "tvshow"})
            for item in home:
                results.append({"id": item.id, "title": item.title, "type": "home"})
            for item in movies:
                results.append({"id": item.id, "title": item.title, "type": "movie"})

        return Response(results)
