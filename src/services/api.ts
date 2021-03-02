import axios from 'axios';

const tmdbAPI = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

tmdbAPI.defaults.headers.common['Authorization'] = 'Bearer ' + process.env.REACT_APP_TMDB_API_TOKEN;
tmdbAPI.defaults.params = {
  language: 'pt-BR',
  certification_country: 'BR',
}

const baseImgURL = 'https://image.tmdb.org/t/p/';

export { baseImgURL };

export default tmdbAPI;