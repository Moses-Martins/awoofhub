import { apiClient } from "../lib/apiClient";
import { Alert } from "../types/alert";
import { ApiResponse } from "../types/api-response";

import pThrottle from 'p-throttle';

const throttle = pThrottle({
    limit: 2,
    interval: 1000
});

const setAlert = throttle(async (id: string): Promise<ApiResponse<Alert>> => {
    const res: ApiResponse<Alert> = await apiClient.post(`/alert/${id}`);
    return res;
});

const removeAlert = throttle(async (id: string): Promise<ApiResponse<any>>  => {
    const res: ApiResponse<any> = await apiClient.delete(`/alert/${id}`);
    return res;
});

async function getBusinessAlert(id: string): Promise<ApiResponse<Alert | null>> {
    const res: ApiResponse<Alert | null> = await apiClient.get(`/alert/${id}`)
    return res;
}


const AlertService = {
    setAlert,
    removeAlert,
    getBusinessAlert,
};

export default AlertService;
