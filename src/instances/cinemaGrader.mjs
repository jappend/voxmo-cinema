export const cinemaGrader = axios.create({
  baseURL: 'http://localhost:6969', // Change Port to your localhost cinemaGrader Port
  timeout: 8000,
  headers: {'X-Custom-Header': 'foobar'}
});