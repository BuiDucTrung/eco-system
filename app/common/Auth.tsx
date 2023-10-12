"use client";
import Link from "next/link";
import { useAuth } from "../hooks/use-auth";

export default function AuthPage({ children }: any) {
  const { login, logout } = useAuth();

  return (
    <>
      {children}
      <Link href={"/login"}>to login</Link>
    </>
  );
}
