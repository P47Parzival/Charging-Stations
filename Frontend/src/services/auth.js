import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

export const authService = {
  async login(email, password) {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    })
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    return response.data
  },

  async register(name, email, password) {
    const response = await axios.post(`${API_URL}/auth/register`, {
      name,
      email,
      password
    })
    return response.data
  },

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'))
  }
} 