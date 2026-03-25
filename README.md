# 🎬 Bl!nk: Go Behind The Streams  
> *A fullstack movie magazine inspired by Netflix’s Tudum — built to go behind the stories you stream.*

![React](https://img.shields.io/badge/Frontend-React.js-61DAFB?logo=react&logoColor=white)
![Node](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)
![Django](https://img.shields.io/badge/API-Django%20REST%20Framework-092E20?logo=django&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)
![Scraper](https://img.shields.io/badge/Scraper-Python%20+%20BeautifulSoup-FFD43B?logo=python&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-red)

---

## 🧠 Overview
**Bl!nk: Go Behind The Streams** is a **digital movie magazine platform** inspired by *Netflix Tudum*, built to showcase trending movies, exclusive articles, and behind-the-scenes stories.  

Unlike typical media apps, Bl!nk’s **articles and data are powered by a custom Python scraper**, managed through a **Django REST API**, and displayed via a **Netflix-style React frontend**.

---

## 🚀 Key Highlights
- 📰 Real-time **Python web scraping** from Netflix Tudum & entertainment sources  
- 🎨 Fully responsive **React frontend** with Tailwind & custom animations  
- 🧩 **Node.js backend** handling authentication and REST API routes  
- 🐍 **Django backend** serving scraped magazine data as structured JSON  
- 🗃 **MongoDB** database for user profiles, bookmarks, and admin content  
- 🔎 Explore, Trending, and Featured sections — just like Netflix’s layout  
- 🔐 **Login / Signup** integrated with Express + MongoDB  
- ⚡ Seamless **API communication** between Node.js and Django  

---

## 🛠 Tech Stack
| Layer | Technology | Purpose |
|-------|-------------|----------|
| 🎨 **Frontend** | React.js, Axios, Tailwind CSS, Custom CSS | UI/UX layer with interactive pages |
| 🧩 **Backend (Node.js)** | Express.js, MongoDB, Mongoose | Handles authentication, API routing |
| 🐍 **Backend (Django)** | Django REST Framework, BeautifulSoup, Requests | Scrapes and serves article data |
| 🗂 **Database** | MongoDB | Stores users, bookmarks, and metadata |
| ⚙️ **Scraper** | Python + BeautifulSoup | Extracts articles, images, and summaries |

---

## 🧱 Architecture Diagram

```mermaid
graph LR
A[React Frontend] -->|Axios| B[Node.js + Express API]
A -->|Axios| C[Django REST API]
C --> E[(Python Scraper - Tudum & Movie Feeds)]
B --> D[(MongoDB Database)]
E --> C
