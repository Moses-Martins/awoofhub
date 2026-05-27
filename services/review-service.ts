import { apiClient } from "../lib/apiClient";
import { ApiResponse } from "../types/api-response";
import { Review, reviewData } from "../types/review";

import pThrottle from 'p-throttle';

const throttle = pThrottle({
    limit: 2,
    interval: 1000
});

const upsertReview = throttle(async (id: string, payload: reviewData): Promise<ApiResponse<Review>>  => {
    const res: ApiResponse<Review> = await apiClient.post(`/reviews/${id}`, payload);
    return res;
});

async function getUserReview(id: string): Promise<ApiResponse<Review>> {
  const res: ApiResponse<Review> = await apiClient.get(`/reviews/${id}`)

  return res;
}

const ReviewService = {
    upsertReview,
    getUserReview
};

export default ReviewService;