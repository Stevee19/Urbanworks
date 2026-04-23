export interface User {
  id: number;
  email: string;
  password_hash: string;
  role: 'admin';
  created_at: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  location: string | null;
  description: string | null;
  image_url: string | null;
  is_featured: number;
  display_order: number;
  created_at: string;
}

export interface SiteContent {
  id: number;
  section: string;
  key: string;
  value: string;
  updated_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    role: string;
  };
}

export interface UserProfile {
  id: number;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  address: string | null;
  role: string;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

export interface UploadResponse {
  url: string;
  filename: string;
}
