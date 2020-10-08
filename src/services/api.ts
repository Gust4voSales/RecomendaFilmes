import axios from 'axios';
import config from './env-vars.json';

const tmdbAPI = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

tmdbAPI.defaults.headers.common['Authorization'] = 'Bearer ' + config.tmdbApiToken;
tmdbAPI.defaults.params = {
  language: 'pt-BR',
  certification_country: 'BR',
}

const baseImgURL = 'https://image.tmdb.org/t/p/';

export { baseImgURL };

export default tmdbAPI;