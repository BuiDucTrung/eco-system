"use client";

import { authApi } from "../api-client/auth-api";
import { useAuth } from "../hooks/use-auth";
export default function LoginPage() {
  const { profile, login, logout } = useAuth();
  async function handleLoginClick() {
    try {
      await login();
    } catch (error) {
      console.log("fail to login", error);
    }
  }
  async function handleGetProfileClick() {
    try {
      await authApi.getProfile();
    } catch (error) {
      console.log("fail to get profile", error);
    }
  }
  async function handleLogoutClick() {
    try {
      await logout();
    } catch (error) {
      console.log("fail to logout", error);
    }
  }

  return (
    <div>
      <h1>Login Page</h1>
      <p>Profile: {JSON.stringify(profile || {}, null, 4)}</p>
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleGetProfileClick}>Get Profile</button>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
}
