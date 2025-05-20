// src/services/movieService.js
import api from './apiServices';

export const getTopRatedMovies = () => api.get('/movie/top_rated');
export const getUpcomingMovies = () => api.get('/movie/upcoming');
export const getPopularMovies = () => api.get('/movie/popular');
export const getNowPlayingMovies = () => api.get('/movie/now_playing');
export const searchMovies = (query) => api.get('/search/movie', {
  params: { query }
});
export const getMovieDetails = (id) => api.get(`/movie/${id}`);
export const getMovieCredits = (id) => api.get(`/movie/${id}/credits`);
export const getMoviesImages = (id) => api.get(`/movie/${id}/images`);
export const getMovieVideos = (id) => api.get(`/movie/${id}/videos`);
export const getTrendingMovies = () => api.get('/trending/movie/day');