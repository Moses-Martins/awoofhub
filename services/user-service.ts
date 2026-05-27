import { apiClient } from "../lib/apiClient";
import { ApiResponse } from "../types/api-response";
import { UpdateUserData, User } from "../types/user";

export async function getUserByIdService(id: string): Promise<ApiResponse<User>> {
  const res: ApiResponse<User> = await apiClient.get(`/users/${id}`)

  return res;
}


export async function updateUserService(payload: UpdateUserData): Promise<ApiResponse<User>> {
  const res: ApiResponse<User> = await apiClient.patch('/users/update/', payload)

  return res;
}


export async function getUserService(): Promise<ApiResponse<User>> {
  const res: ApiResponse<User> = await apiClient.get('/users/me')
  
  return res;
}



