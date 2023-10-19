export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  expiredAt: string;
}

export interface UserProfile {
  username: string;
  city: string;
  email: string;
}
