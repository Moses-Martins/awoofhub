import { useWishlist } from "./useWishlist";

export const useWishlistCount = () => {
    const { data } = useWishlist();
    const count = data?.length ?? 0

    return count;
};