from rest_framework import serializers
from .models import Article, TrendingArticle,TVShowsArticle
from .models import WhatToWatchArticle,MoviesArticle,HomepageArticle

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'

class TrendingArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrendingArticle
        fields = [
            "id", "headline", "subheadline", "image_url", "eyebrow", "author",
            "article_date", "article_data", "article_link", "original_url",
            "article_image", "article_headings"
        ]

from rest_framework import serializers


class WhatToWatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhatToWatchArticle
        fields =  [
            "id", "headline", "subheadline", "image_url", "eyebrow", "author",
            "article_date", "article_data", "article_link", "original_url",
            "article_image", "article_headings"
        ]

class TVShowsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TVShowsArticle
        fields =  [
            "id", "headline", "subheadline", "image_url", "eyebrow", "author",
            "article_date", "article_data", "article_link", "original_url",
            "article_image", "article_headings"
        ]

class MoviesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MoviesArticle
        fields =  [
            "id", "headline", "subheadline", "image_url", "eyebrow", "author",
            "article_date", "article_data", "article_link", "original_url",
            "article_image", "article_headings"
        ]
class HomepageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomepageArticle
        fields =  [
            "id", "headline", "subheadline", "image_url", "eyebrow", "author",
            "article_date", "article_data", "article_link", "original_url",
            "article_image", "article_headings"
        ]
