import { useUser } from "@/features/user/useUser";
import { Redirect } from "expo-router";
import { ReactNode } from "react";
import Loading from "../loading/Loading";

export type ProtectedProps = {
  children: ReactNode;
};

export default function Protected({ children }: ProtectedProps) {
  const user = useUser();

  if (user.isLoading) {
    return <Loading />;
  }

  if (!user.data) {
    return <Redirect href="/login" />; 
  }

  return <>{children}</>;
};