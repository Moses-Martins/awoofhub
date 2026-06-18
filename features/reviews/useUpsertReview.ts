
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ReviewService from "../../services/review-service";
import { ApiResponse } from "../../types/api-response";
import { Review, reviewData } from "../../types/review";

type UpsertReviewOptions = {
    id: string;
};

export const UpsertReview = (offerId: string, data: reviewData): Promise<ApiResponse<Review>> => {
    return ReviewService.upsertReview(offerId, data); 
};

export const useUpsertReview = ({ id }: UpsertReviewOptions) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: reviewData) => UpsertReview(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['review', id] });
      queryClient.setQueryData(['review', id], data);
    },
  });

  return { upsertReview: mutate, isPending };
};