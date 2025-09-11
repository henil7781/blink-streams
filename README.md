# 🎬 Bl!nk: Go Behind The Streams  

A **fullstack movie magazine** inspired by Netflix’s Tudum.  
Built with **React (Frontend)**, **Node.js + Express + MongoDB (Backend)**, and **Django + Python scraping** for content aggregation.  

---

## 📌 Table of Contents
- [About](#-about)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Architecture](#-architecture)
- [Folder Structure](#-folder-structure)
- [Setup & Installation](#-setup--installation)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📖 About
**Bl!nk: Go Behind The Streams** is a digital magazine platform that brings trending entertainment content, inspired by **Netflix Tudum**.  

It combines **real-time scraping, APIs, and a rich React frontend** to showcase:
- Trending movies & shows  
- Editor’s picks & featured articles  
- Personalized recommendations  

---

## 🛠 Tech Stack
- **Frontend:** React.js, Axios, Tailwind CSS, custom CSS  
- **Backend (Node):** Express.js, MongoDB, Puppeteer (scraping)  
- **Backend (Django):** Django REST Framework, BeautifulSoup/Requests (scraping)  
- **Python:** Data cleaning, scraping, JSON handling  
- **Database:** MongoDB  

---

## ✨ Features
✅ Dynamic article fetching from Tudum  
✅ Trending, Popular Now, Explore More sections  
✅ Spotlight & Featured articles  
✅ Login/Signup with MongoDB authentication  
✅ Admin APIs to manage content  
✅ Responsive Netflix-like UI  

---

## 🏗 Architecture
```mermaid
graph LR
A[React Frontend] --> B[Node.js + Express API]
A --> C[Django REST API]
B --> D[(MongoDB)]
C --> E[(Python Scraper - Tudum)]
