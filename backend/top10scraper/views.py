from django.shortcuts import render

# Create your views here.
# top10scraper/views.py
import requests
from bs4 import BeautifulSoup
from django.http import JsonResponse

def scrape_tudum(country="global", item_type="films"):
    # Build base URL
    if country == "global":
        base = "https://www.netflix.com/tudum/top10"
    else:
        base = f"https://www.netflix.com/tudum/top10/{country}"

    # For shows
    if item_type == "tv":
        base += "/tv"

    response = requests.get(base)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Arrays
    top10_title = []
    top10_images = []
    top10_poster = []
    top10_watch = []

    # Titles
    title_blocks = soup.find_all("div", class_="css-1h3btjz")
    for block in title_blocks:
        imgs = block.find_all("img")
        for img in imgs:
            alt = img.get("alt")
            src = img.get("src")
            if alt and src:
                top10_title.append(alt)
                top10_poster.append(src)

    # Background/card image + watch links
    items = soup.find_all("div", class_="css-1humui4 eespg911")
    for div in items:
        style = div.get("style")
        if style:
            image_url = style.replace("background-image:url(", "").replace(")", "").strip()
            clean_url = image_url.split(";")[0]
            top10_images.append(clean_url)

        watch_tag = div.find("a", class_="compactButtonSvgWrapper css-1hme2p9")
        if watch_tag:
            top10_watch.append(watch_tag.get("href"))
        else:
            top10_watch.append(None)

    # Zip arrays cleanly
    result = []
    for i in range(len(top10_title)):
        result.append({
            "title": top10_title[i],
            "poster": top10_poster[i] if i < len(top10_poster) else None,
            "bg_image": top10_images[i] if i < len(top10_images) else None,
            "watch_link": top10_watch[i] if i < len(top10_watch) else None
        })

    return result

def top10_api(request, country, item_type):
    """
    GET /api/top10/india/films/
    GET /api/top10/india/tv/
    GET /api/top10/global/films/
    """
    data = scrape_tudum(country, item_type)
    return JsonResponse(data, safe=False)
