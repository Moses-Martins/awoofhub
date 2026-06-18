import { useWishlist } from "./useWishlist";

export const useIsInWishlist = (offerId: string) => {
  const { data } = useWishlist();

  return data?.some(item => item.offer.id === offerId);
};