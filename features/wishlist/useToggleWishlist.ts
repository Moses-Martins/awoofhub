import { useAddToWishlist } from "./useAddToWishlist";
import { useIsInWishlist } from "./useIsInWishlist";
import { useRemoveFromWishlist } from "./useRemoveFromWishlist";

export const useToggleWishlist = (offerId: string) => {
  const isWishlisted = useIsInWishlist(offerId);
  const { addToWishlist } = useAddToWishlist({offerId});
  const { removeFromWishlist } = useRemoveFromWishlist({offerId});

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist();
    } else {
      addToWishlist();
    }
  };

  return { toggleWishlist, isWishlisted };
};