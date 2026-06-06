import { ReactNode } from "react";
import { Text, View } from "react-native";

import { useUser } from "@/features/user/useUser";
import { useUserById } from "@/features/user/useUserById";

import Loading from "../loading/Loading";
import ProfileHeader from "./ProfileHeader";

interface Props {
  userId: string;
  children: ReactNode;
}

export default function ProfilePageWrapper({userId, children}: Props) {
  const { data: currentUser } = useUser();
  const { data: user, isLoading } = useUserById({ id: userId });

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <View
        style={{
          paddingTop: 56,
          paddingHorizontal: 24,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#6B7280",
          }}
        >
          User not found.
        </Text>
      </View>
    );
  }

  const isOwnProfile = currentUser?.id === user.id;

  return (
    <>
      <ProfileHeader
        isOwnProfile={isOwnProfile}
        profile={user}
      />
      {children}
    </>
  );
}