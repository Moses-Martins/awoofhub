import { apiClient } from "../lib/apiClient";
import { ApiResponse } from "../types/api-response";
import { Wishlist } from "../types/wishlist";

import pThrottle from 'p-throttle';

const throttle = pThrottle({
	limit: 2,
	interval: 1000
});

const addToWishlist = throttle(async (id: string): Promise<ApiResponse<Wishlist>> => {
    const res: ApiResponse<Wishlist> = await apiClient.post(`/wishlist/${id}`);
    return res;
});

const removeFromWishlist = throttle(async (id: string): Promise<ApiResponse<any>>  => {
    const res: ApiResponse<Wishlist> = await apiClient.delete(`/wishlist/${id}`);
    return res;
});

async function getAllWishlist(): Promise<ApiResponse<Wishlist[]>> {
    const res: ApiResponse<Wishlist[]> = await apiClient.get('/wishlist/')
    return res;
}

const WishlistService = {
    addToWishlist,
    removeFromWishlist,
    getAllWishlist
};



export default WishlistService;