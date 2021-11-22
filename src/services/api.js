import axios from 'axios';

// URL filmes em cartaz;
// https://api.themoviedb.org/3/
// movie/now_playing?api_key=69b45576f61fbb8f23e20dda8c09007d&language=pt-BR&page=1

export const key = '69b45576f61fbb8f23e20dda8c09007d'

const api = axios.create({
   baseURL: 'https://api.themoviedb.org/3'
})

export default api;