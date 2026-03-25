import os
import django
import pandas as pd
from django.conf import settings

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from magazine_backend.models import (
    TrendingArticle, 
    HomepageArticle, 
    WhatToWatchArticle, 
    TVShowsArticle, 
    MoviesArticle
)

# Configuration: Map CSV filenames to their Django Models
MODEL_MAP = {
    'new_trending_movies_with_articles_data.csv': TrendingArticle,
    'new_homepage_with_articles_data.csv': HomepageArticle,
    'new_what-to_watch_with_articles_data.csv': WhatToWatchArticle,
    'new_tvshows_with_articles_data.csv': TVShowsArticle,
    'new_movies_with_articles_data.csv': MoviesArticle,
}

def import_csv_to_model(csv_filename):
    model = MODEL_MAP.get(csv_filename)
    if not model:
        print(f"❌ No model mapping found for: {csv_filename}")
        return

    csv_path = os.path.join(settings.BASE_DIR, 'data', csv_filename)
    if not os.path.exists(csv_path):
        print(f"❌ CSV file not found: {csv_path}")
        return

    print(f"\n📂 Processing {csv_filename} -> {model.__name__}...")

    try:
        df = pd.read_csv(csv_path)
    except Exception as e:
        print(f"❌ Error reading CSV: {e}")
        return

    # Clear old data
    print(f"🗑️  Clearing old {model.__name__} entries...")
    model.objects.all().delete()

    # Prepare instances for bulk create
    print(f"🚀 Preparing {len(df)} records...")
    instances = []
    for _, row in df.iterrows():
        instances.append(model(
            headline=row.get("Article Headline", ""),
            subheadline=row.get("Article SubHeadline", ""),
            image_url=row.get("Movie Article Image", ""),
            eyebrow=row.get("Eyebrow Headline", ""),
            author=row.get("By", "No Author Mentioned"),
            article_date=row.get("Article Date", ""),
            article_data=row.get("Article Data", ""),
            article_link=row.get("Article Link", ""),
            original_url=row.get("Original URL", ""),
            article_image=row.get("Article Image", ""),
            article_headings=row.get("Article Headings", "")
        ))

    # Perform bulk insert (High performance)
    try:
        model.objects.bulk_create(instances)
        print(f"✅ Successfully imported {len(instances)} records into {model.__name__}!")
    except Exception as e:
        print(f"❌ Bulk import failed: {e}")

if __name__ == "__main__":
    # You can specify which files to import here
    files_to_import = [
        'new_trending_movies_with_articles_data.csv',
        'new_homepage_with_articles_data.csv',
        'new_what-to_watch_with_articles_data.csv',
        'new_tvshows_with_articles_data.csv',
        'new_movies_with_articles_data.csv',
    ]

    for filename in files_to_import:
        import_csv_to_model(filename)
    
    print("\n✨ All imports complete!")
