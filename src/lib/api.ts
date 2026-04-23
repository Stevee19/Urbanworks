import type { LoginRequest, LoginResponse, Project, SiteContent, UploadResponse, UserProfile, ChangePasswordRequest } from '../../server/src/types';

const API_BASE = '/api';

function getToken(): string | null {
  return localStorage.getItem('admin_token');
}

function setToken(token: string): void {
  localStorage.setItem('admin_token', token);
}

function clearToken(): void {
  localStorage.removeItem('admin_token');
}

async function fetchWithAuth<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${res.status}`);
  }

  return res.json();
}

// Auth
export const authApi = {
  login: (data: LoginRequest) => fetchWithAuth<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  logout: () => clearToken(),
  getToken,
  setToken,
};

// Projects
export const projectsApi = {
  getAll: () => fetchWithAuth<Project[]>('/projects'),
  getById: (id: number) => fetchWithAuth<Project>(`/projects/${id}`),
  create: (data: Partial<Project>) => fetchWithAuth<Project>('/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: number, data: Partial<Project>) => fetchWithAuth<Project>(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: number) => fetchWithAuth<{ message: string }>(`/projects/${id}`, {
    method: 'DELETE',
  }),
  reorder: (orders: { id: number; order: number }[]) => fetchWithAuth<{ message: string }>('/projects/reorder', {
    method: 'PUT',
    body: JSON.stringify({ orders }),
  }),
};

// Content
export const contentApi = {
  getAll: () => fetchWithAuth<SiteContent[]>('/content'),
  getBySection: (section: string) => fetchWithAuth<SiteContent[]>(`/content/section/${section}`),
  update: (section: string, key: string, value: string) =>
    fetchWithAuth<SiteContent>(`/content/${section}/${key}`, {
      method: 'PUT',
      body: JSON.stringify({ value }),
    }),
  updateSection: (section: string, entries: Record<string, string>) =>
    fetchWithAuth<SiteContent[]>(`/content/${section}`, {
      method: 'PUT',
      body: JSON.stringify(entries),
    }),
};

// Upload/Media
export const uploadApi = {
  upload: async (file: File): Promise<UploadResponse> => {
    const token = getToken();
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: 'Upload failed' }));
      throw new Error(error.error || `HTTP ${res.status}`);
    }

    return res.json();
  },
  getAll: () => fetchWithAuth<any[]>('/media'),
  delete: (id: number) => fetchWithAuth<{ message: string }>(`/media/${id}`, {
    method: 'DELETE',
  }),
};

// Settings
export const settingsApi = {
  getProfile: () => fetchWithAuth<UserProfile>('/settings/profile'),
  updateProfile: (data: Partial<UserProfile>) => fetchWithAuth<UserProfile>('/settings/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  changePassword: (data: ChangePasswordRequest) => fetchWithAuth<{ message: string }>('/settings/change-password', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};
