import { apiClient } from "../lib/apiClient";
import { ApiResponse } from "../types/api-response";


export async function getStreamChatToken(): Promise<string> {
    const res: ApiResponse<{token: string}> = await apiClient.get("/chat/token/")
    return res.data.token;
}


export async function getMessagesCountService(): Promise<ApiResponse<{unreadCount: number}>> {
    const res: ApiResponse<{unreadCount: number}> = await apiClient.get("/chat/stats/")
    return res;
}


