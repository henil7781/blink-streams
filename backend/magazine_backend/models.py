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
    headline = models.CharField(max_length=300)
    subheadline = models.CharField(max_length=500, blank=True)
    image_url = models.URLField(max_length=500)
    eyebrow = models.CharField(max_length=300, blank=True)
    author = models.CharField(max_length=200, default="No Author Mentioned")
    article_date = models.CharField(max_length=100)
    article_data = models.TextField(blank=True)
    article_link = models.URLField(max_length=500, blank=True)
    original_url = models.URLField(max_length=500, blank=True)
    article_image = models.URLField(max_length=500, blank=True)
    article_headings = models.TextField(blank=True)
    


    def __str__(self):
        return self.headline

# magazine_backend/models.py

from django.db import models
# from django.utils.text import slugify
from django.db import models
# from django.utils.text import slugify

class WhatToWatchArticle(models.Model):
    headline = models.CharField(max_length=255, blank=True)
    # slug = models.SlugField(unique=True)

    subheadline = models.CharField(max_length=255, blank=True)
    image_url = models.URLField(blank=True)
    eyebrow = models.CharField(max_length=255, blank=True)
    author = models.CharField(max_length=255, blank=True)
    article_date = models.CharField(max_length=50, blank=True)
    article_data = models.TextField(blank=True)
    article_link = models.URLField(blank=True)
    original_url = models.URLField(blank=True)
    article_image = models.URLField(blank=True)
    article_headings = models.TextField(blank=True)

    class Meta:
        db_table = "what_to_watch"  # safer than using dashes

    # def save(self, *args, **kwargs):
    #     if not self.slug and self.headline:
    #         self.slug = slugify(self.headline)
    #     super().save(*args, **kwargs)

    def __str__(self):
        return self.headline or "No Title"


class TVShowsArticle(models.Model):
    headline = models.CharField(max_length=255, blank=True)
    # slug = models.SlugField(unique=True)

    subheadline = models.CharField(max_length=255, blank=True)
    image_url = models.URLField(blank=True)
    eyebrow = models.CharField(max_length=255, blank=True)
    author = models.CharField(max_length=255, blank=True)
    article_date = models.CharField(max_length=50, blank=True)
    article_data = models.TextField(blank=True)
    article_link = models.URLField(blank=True)
    original_url = models.URLField(blank=True)
    article_image = models.URLField(blank=True)
    article_headings = models.TextField(blank=True)

    class Meta:
        db_table = "tv_shows_article"  # safer than using dashes

    # def save(self, *args, **kwargs):
    #     if not self.slug and self.headline:
    #         self.slug = slugify(self.headline)
    #     super().save(*args, **kwargs)

    def __str__(self):
        return self.headline or "No Title"
    
class MoviesArticle(models.Model):
    headline = models.CharField(max_length=255, blank=True)
    # slug = models.SlugField(unique=True)

    subheadline = models.CharField(max_length=255, blank=True)
    image_url = models.URLField(blank=True)
    eyebrow = models.CharField(max_length=255, blank=True)
    author = models.CharField(max_length=255, blank=True)
    article_date = models.CharField(max_length=50, blank=True)
    article_data = models.TextField(blank=True)
    article_link = models.URLField(blank=True)
    original_url = models.URLField(blank=True)
    article_image = models.URLField(blank=True)
    article_headings = models.TextField(blank=True)

    class Meta:
        db_table = "movies_article"  # safer than using dashes

    # def save(self, *args, **kwargs):
    #     if not self.slug and self.headline:
    #         self.slug = slugify(self.headline)
    #     super().save(*args, **kwargs)

    def __str__(self):
        return self.headline or "No Title"
    
class HomepageArticle(models.Model):
    headline = models.CharField(max_length=255, blank=True)
    # slug = models.SlugField(unique=True)

    subheadline = models.CharField(max_length=255, blank=True)
    image_url = models.URLField(blank=True)
    eyebrow = models.CharField(max_length=255, blank=True)
    author = models.CharField(max_length=255, blank=True)
    article_date = models.CharField(max_length=50, blank=True)
    article_data = models.TextField(blank=True)
    article_link = models.URLField(blank=True)
    original_url = models.URLField(blank=True)
    article_image = models.URLField(blank=True)
    article_headings = models.TextField(blank=True)

    class Meta:
        db_table = "homepage_article"  # safer than using dashes

    # def save(self, *args, **kwargs):
    #     if not self.slug and self.headline:
    #         self.slug = slugify(self.headline)
    #     super().save(*args, **kwargs)

    def __str__(self):
        return self.headline or "No Title"