import { apiClient } from "../lib/apiClient";
import { ApiResponse } from "../types/api-response";
import { Moderation } from "../types/moderation";

async function history(id: string): Promise<ApiResponse<Moderation[]>> {
  const res: ApiResponse<Moderation[]> = await apiClient.get(`/moderation/history/${id}`)

  return res;
}


async function latestHistory(id: string): Promise<ApiResponse<Moderation>> {
  const res: ApiResponse<Moderation> = await apiClient.get(`/moderation/history/${id}/latest`)

  return res;
}

const ModerationService = {
  history,
  latestHistory,
};

export default ModerationService;