import axios from 'axios';


const API_KEY = process.env.REACT_APP_TMDB_API_KEY; 

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY,
  },
});

export default api;
