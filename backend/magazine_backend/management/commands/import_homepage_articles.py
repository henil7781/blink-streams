import os
import pandas as pd
from django.core.management.base import BaseCommand
from django.conf import settings
from magazine_backend.models import HomepageArticle


class Command(BaseCommand):
    help = "Import 'What to Watch' articles from CSV into Django database (without deleting existing data)"

    def handle(self, *args, **kwargs):
        # Path to CSV inside 'data' folder at project root
        csv_path = os.path.join(settings.BASE_DIR, 'data', 'new_homepage_with_articles_data.csv')

        if not os.path.exists(csv_path):
            self.stdout.write(self.style.ERROR(f"❌ CSV file not found: {csv_path}"))
            return

        # Read CSV
        try:
            df = pd.read_csv(csv_path)
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error reading CSV: {e}"))
            return

        inserted_count = 0
  # Clear old data
        HomepageArticle.objects.all().delete()
        self.stdout.write(self.style.WARNING("🗑 Old trending articles deleted."))
        # Insert new data without clearing old records
        for _, row in df.iterrows():
            HomepageArticle.objects.create(
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
            inserted_count += 1

        self.stdout.write(self.style.SUCCESS(f"✅ Imported {inserted_count} new articles successfully."))
