const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance with default config
const api = {
  // Auth endpoints
  auth: {
    login: (credentials) => fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    }),
    register: (userData) => fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    }),
    logout: () => fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
  },

  // Quiz endpoints
  quizzes: {
    getAll: () => fetch(`${API_BASE_URL}/api/quizzes`),
    getById: (id) => fetch(`${API_BASE_URL}/api/quizzes/${id}`),
    create: (quizData, token) => fetch(`${API_BASE_URL}/api/quizzes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(quizData)
    }),
    update: (id, quizData, token) => fetch(`${API_BASE_URL}/api/quizzes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(quizData)
    }),
    delete: (id, token) => fetch(`${API_BASE_URL}/api/quizzes/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },

  // User endpoints
  user: {
    getProfile: (token) => fetch(`${API_BASE_URL}/api/user/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }),
    updateProfile: (userData, token) => fetch(`${API_BASE_URL}/api/user/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    })
  },

  // Health check
  healthCheck: () => fetch(`${API_BASE_URL}/`)
};

export default api;
export { API_BASE_URL };
