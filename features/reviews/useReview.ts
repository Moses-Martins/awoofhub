import { useUpsertReview } from "./useUpsertReview";
import { useUserReview } from "./useUserReview";

export const useReview = (id: string) => {
  const { review } = useUserReview({id});
  const { upsertReview } = useUpsertReview({ id });

  const submitReview = (rating: number) => {
    upsertReview({
      rating,
    });
  };

  return {
    review,
    submitReview,
  };
};