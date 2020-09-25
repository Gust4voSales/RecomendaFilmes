import axios from 'axios';
import tmdbApiToken from './env-vars.json';

const tmdbAPI = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

tmdbAPI.defaults.headers.common['Authorization'] = 'Bearer ' + tmdbApiToken;
tmdbAPI.defaults.params = {
  language: 'pt-BR',
}

export default tmdbAPI;