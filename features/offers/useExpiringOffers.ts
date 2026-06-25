"use client";
import OfferService from "@/services/offer-service";
import { ApiResponse } from "@/types/api-response";
import { Offer } from "@/types/offer";
import { useInfiniteQuery } from "@tanstack/react-query";

type GetExpiringOffersOptions = {
    page?: number;
    limit: number;
};

export const getExpiringOffers = async ({ page = 1, limit }: GetExpiringOffersOptions): Promise<ApiResponse<Offer[]>> => {
    return OfferService.expiringOffers(page, limit);
};

export const useExpiringOffers = ({ limit = 8 }: GetExpiringOffersOptions) => {
    const {  data, isFetchingNextPage, isFetched, isLoading, isFetching, fetchNextPage, hasNextPage, isError, error } = useInfiniteQuery({
        queryKey: ["expiringOffers", limit],
        queryFn: ({ pageParam = 1 }) => getExpiringOffers({ page: pageParam, limit }),

        getNextPageParam: (lastPage) => {
            if (!lastPage.meta) return undefined;

            const currentPage = Number(lastPage.meta.page);
            const totalPages = Number(lastPage.meta.totalPages);

            return currentPage < totalPages ? currentPage + 1 : undefined;
        },
        initialPageParam: 1,
    });

    return { 
        data, 
        isFetchingNextPage, 
        isLoading, 
        isFetching, 
        isFetched,
        fetchNextPage, 
        hasNextPage, 
        isError, 
        error
     };
};