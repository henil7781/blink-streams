import os
import pandas as pd
from django.core.management.base import BaseCommand
from django.conf import settings
from magazine_backend.models import TrendingArticle  # Change to your actual app name if different


class Command(BaseCommand):
    help = "Import trending articles from CSV into Django database"

    def handle(self, *args, **kwargs):
        # Path to CSV inside 'data' folder at project root
        csv_path = os.path.join(settings.BASE_DIR, 'data', 'new_trending_movies_with_articles_data.csv')

        if not os.path.exists(csv_path):
            self.stdout.write(self.style.ERROR(f"❌ CSV file not found: {csv_path}"))
            return

        # Read CSV
        try:
            df = pd.read_csv(csv_path)
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error reading CSV: {e}"))
            return

        # Clear old data
        TrendingArticle.objects.all().delete()
        self.stdout.write(self.style.WARNING("🗑 Old trending articles deleted."))

        # Insert new data
        for _, row in df.iterrows():
            TrendingArticle.objects.create(
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
            )

        self.stdout.write(self.style.SUCCESS(f"✅ Imported {len(df)} articles successfully."))
