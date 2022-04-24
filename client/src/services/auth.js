import API from '../api.js';

export default function signup (userData) {
  return API.post('/users', userData)
}
