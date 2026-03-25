from django.db import models

# magazine_backend/models.py
class Article(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title



from django.db import models

class TrendingArticle(models.Model):
    headline = models.TextField()
    subheadline = models.TextField(blank=True)
    image_url = models.TextField(blank=True)
    eyebrow = models.TextField(blank=True)
    author = models.CharField(max_length=255, default="No Author Mentioned")
    article_date = models.CharField(max_length=100)
    article_data = models.TextField(blank=True)
    article_link = models.TextField(blank=True)
    original_url = models.TextField(blank=True)
    article_image = models.TextField(blank=True)
    article_headings = models.TextField(blank=True)
    


    def __str__(self):
        return self.headline

# magazine_backend/models.py

from django.db import models
# from django.utils.text import slugify
from django.db import models
# from django.utils.text import slugify

class WhatToWatchArticle(models.Model):
    headline = models.TextField(blank=True)
    subheadline = models.TextField(blank=True)
    image_url = models.TextField(blank=True)
    eyebrow = models.TextField(blank=True)
    author = models.TextField(blank=True)
    article_date = models.CharField(max_length=100, blank=True)
    article_data = models.TextField(blank=True)
    article_link = models.TextField(blank=True)
    original_url = models.TextField(blank=True)
    article_image = models.TextField(blank=True)
    article_headings = models.TextField(blank=True)

    class Meta:
        db_table = "what_to_watch"

    def __str__(self):
        return self.headline or "No Title"

class TVShowsArticle(models.Model):
    headline = models.TextField(blank=True)
    subheadline = models.TextField(blank=True)
    image_url = models.TextField(blank=True)
    eyebrow = models.TextField(blank=True)
    author = models.TextField(blank=True)
    article_date = models.CharField(max_length=100, blank=True)
    article_data = models.TextField(blank=True)
    article_link = models.TextField(blank=True)
    original_url = models.TextField(blank=True)
    article_image = models.TextField(blank=True)
    article_headings = models.TextField(blank=True)

    class Meta:
        db_table = "tv_shows_article"

    def __str__(self):
        return self.headline or "No Title"
    
class MoviesArticle(models.Model):
    headline = models.TextField(blank=True)
    subheadline = models.TextField(blank=True)
    image_url = models.TextField(blank=True)
    eyebrow = models.TextField(blank=True)
    author = models.TextField(blank=True)
    article_date = models.CharField(max_length=100, blank=True)
    article_data = models.TextField(blank=True)
    article_link = models.TextField(blank=True)
    original_url = models.TextField(blank=True)
    article_image = models.TextField(blank=True)
    article_headings = models.TextField(blank=True)

    class Meta:
        db_table = "movies_article"

    def __str__(self):
        return self.headline or "No Title"
    
class HomepageArticle(models.Model):
    headline = models.TextField(blank=True)
    subheadline = models.TextField(blank=True)
    image_url = models.TextField(blank=True)
    eyebrow = models.TextField(blank=True)
    author = models.TextField(blank=True)
    article_date = models.CharField(max_length=100, blank=True)
    article_data = models.TextField(blank=True)
    article_link = models.TextField(blank=True)
    original_url = models.TextField(blank=True)
    article_image = models.TextField(blank=True)
    article_headings = models.TextField(blank=True)

    class Meta:
        db_table = "homepage_article"

    def __str__(self):
        return self.headline or "No Title"