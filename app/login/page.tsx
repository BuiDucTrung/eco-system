"use client";

import { Paper, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import LoginForm from "../common/auth/LoginForm";
import { useAuth } from "../hooks/use-auth";
import { LoginPayload } from "../models/login";
import { getErrorMessage } from "../utils/getErrorMessage";
import { decodeUrl } from "../utils/url";
export default function LoginPage() {
  const { login, logout } = useAuth();
  const route = useRouter();
  const search = useSearchParams();

  async function handleLoginSubmit(payload: LoginPayload) {
    try {
      await login(payload);
      const backTo = search.get("back_to") ? decodeUrl(search.get("back_to") || "") : "/";
      route.push(backTo);
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
