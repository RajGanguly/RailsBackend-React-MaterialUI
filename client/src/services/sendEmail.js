import API from '../api.js';

export default function sendEmail (userData) {
  return API.post('/tasks/email_invitation', userData)
}