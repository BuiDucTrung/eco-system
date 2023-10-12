export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  expiredAt: string;
}
