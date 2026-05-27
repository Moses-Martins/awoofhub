export interface User {
  id: string;
  email: string;
  name: string;
  profileImageUrl: string | null;
  role: "user" | "business";
  bio: string | null;
  address: string | null;
  website: string | null;
  createdAt: string;
  updatedAt: string;
};

export interface UpdateUserData {
  name?: string;
  profileImageUrl?: string;
  bio?: string;
  address?: string;
  website?: string;
  role?: "user" | "business";
};



