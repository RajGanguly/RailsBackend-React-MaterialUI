import API from '../api.js';

export default function authenticate (userData) {
    return API.post('/users/sign_in', userData)
}
