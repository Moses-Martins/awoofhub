
import { useMutation, useQueryClient } from '@tanstack/react-query';
import WishlistService from "../../services/wishlist-service";
import { Wishlist } from "../../types/wishlist";

type AddToWishlistOptions = {
  offerId: string;
};

export const AddToWishlist = async ({ offerId }: AddToWishlistOptions): Promise<Wishlist> => {
  const result = await WishlistService.addToWishlist(offerId);
  return result.data
};

export const useAddToWishlist = ({ offerId }: AddToWishlistOptions) => {
  const queryClient = useQueryClient();
  
  const { mutate, isPending } = useMutation({
    mutationFn: () => AddToWishlist({ offerId }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["wishlist"] });

      const previousWishlist = queryClient.getQueryData<Wishlist[]>(["wishlist"]);

      queryClient.setQueryData<Wishlist[]>(["wishlist"], (old = []) => {
        if (old.some(item => item.offer.id === offerId)) return old;

        return [
          ...old,
          {
            id: `temp-${Date.now()}`,
            user: { id: "temp" }, // doesn't matter
            offer: { id: offerId } as any, // minimal shape needed
          },
        ];
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

  return { addToWishlist: mutate, isPending };
};
