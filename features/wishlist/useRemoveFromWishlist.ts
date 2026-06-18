
import { useMutation, useQueryClient } from '@tanstack/react-query';
import WishlistService from "../../services/wishlist-service";
import { Wishlist } from "../../types/wishlist";

type RemoveFromWishlistOptions = {
  offerId: string;
};

export const RemoveFromWishlist = async ({ offerId }: RemoveFromWishlistOptions): Promise<any> => {
  const result = await WishlistService.removeFromWishlist(offerId);
  return result.data;

};

export const useRemoveFromWishlist = ({ offerId }: RemoveFromWishlistOptions) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => RemoveFromWishlist({ offerId }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["wishlist"] });

      const previousWishlist = queryClient.getQueryData<Wishlist[]>(["wishlist"]);

      queryClient.setQueryData<Wishlist[]>(["wishlist"], (old = []) => {
        return old.filter(item => item.offer.id !== offerId);
      });

      return { previousWishlist };
    },

    onError: (_, __, context) => {
      if (context?.previousWishlist) {
        queryClient.setQueryData(["wishlist"], context.previousWishlist);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },

  });

  return { removeFromWishlist: mutate, isPending };
};
