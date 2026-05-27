import { apiClient } from "../lib/apiClient";
import { ActivityData } from "../types/activity";
import { ApiResponse } from "../types/api-response";


async function getAllActivities(page: number, limit: number): Promise<ApiResponse<ActivityData[]>> {
    const res: ApiResponse<ActivityData[]> = await apiClient.get('/notifications/', {
        params: { page, limit },
    })

    return res;
}

async function getActivityCount(): Promise<ApiResponse<number>> {
    const res: ApiResponse<number> = await apiClient.get("/notifications/unread/")
    return res;
}

async function markAsRead(id: string): Promise<ApiResponse<{}>> {
    const res: ApiResponse<{}> = await apiClient.patch(`/notifications/${id}/read`)
    return res;
}


const ActivityService = {
    getAllActivities,
    getActivityCount,
    markAsRead
};

export default ActivityService;
