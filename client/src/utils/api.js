const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

export const api = {
  // Public
  get: (path, options = {}) =>
    fetch(`${API_BASE}${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }),

  // Admin (with cookies)
  getAdmin: (path, options = {}) =>
    fetch(`${API_BASE}${path}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }),

  postAdmin: (path, body, options = {}) =>
    fetch(`${API_BASE}${path}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(body),
      ...options,
    }),

  putAdmin: (path, body, options = {}) =>
    fetch(`${API_BASE}${path}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(body),
      ...options,
    }),

  deleteAdmin: (path, options = {}) =>
    fetch(`${API_BASE}${path}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }),
}
