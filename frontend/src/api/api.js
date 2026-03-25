import axios from 'axios';

export const DJANGO_BASE_URL = process.env.REACT_APP_DJANGO_URL || 'https://blink-streams.onrender.com';
export const NODE_BASE_URL = process.env.REACT_APP_NODE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${DJANGO_BASE_URL}/api`,
});

// Django Content APIs
export const fetchTrendingArticles = () => api.get('/trending-articles/');
export const fetchTrendingArticleById = (id) => api.get(`/trending-articles/${id}/`);

export const fetchWhatToWatch = () => api.get('/what-to-watch/');
export const fetchWhatToWatchById = (id) => api.get(`/what-to-watch/${id}/`);

export const fetchTVShows = () => api.get('/tv-shows/');
export const fetchTVShowById = (id) => api.get(`/tv-shows/${id}/`);

export const fetchHomepageArticles = () => api.get('/homepage/');
export const fetchHomepageArticleById = (id) => api.get(`/homepage/${id}/`);

export const fetchMovies = () => api.get('/movies/');
export const fetchMovieById = (id) => api.get(`/movies/${id}/`);

export const fetchTop10 = (country = 'global', type = 'films') => api.get(`/top10/${country}/${type}/`);

export const fetchArticleBySlug = (slug) => api.get(`/articles/${slug}/`);

export default api;
