export const cinemaGrader = axios.create({
  baseURL: 'http://localhost:7777', // Change port according to your Cinema Grader API localhost
  timeout: 8000,
  headers: {'X-Custom-Header': 'foobar'},
  withCredentials: true
});