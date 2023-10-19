"use client";

import { Paper, Typography } from "@mui/material";
import { authApi } from "../api-client/auth-api";
import LoginForm from "../common/auth/LoginForm";
import { useAuth } from "../hooks/use-auth";
import { LoginPayload } from "../models/login";
import { getErrorMessage } from "../utils/getErrorMessage";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const { profile, login, logout } = useAuth();
  const route = useRouter();

  async function handleGetProfileClick() {
    try {
      await authApi.getProfile();
    } catch (error) {
      console.log("fail to get profile", error);
    }
  }
  async function handleLoginSubmit(payload: LoginPayload) {
    try {
      await login(payload);
      route.push("/");
    } catch (error) {
      const message = getErrorMessage(error);
      console.log("fail to login", message);
      toast.error(message);
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
      <Paper elevation={4} sx={{ maxWidth: "480px", mx: "auto", mt: 8, p: 4 }}>
        <Typography component={"h1"} variant="h5" textAlign={"center"}>
          Login
        </Typography>
        <LoginForm onSubmit={handleLoginSubmit} />
      </Paper>
    </div>
  );
}
