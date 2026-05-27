'use client'
import { useInfiniteQuery } from '@tanstack/react-query';
import OfferService from '../../services/offer-service';
import { ApiResponse } from '../../types/api-response';
import { Offer } from '../../types/offer';


type GetOffersByUserId = {
    userId: string,
    search: string,
    category: string,
    minRating: number,
    createdFrom: string,
    createdTo: string,
    page?: number,
    limit: number,
};

export const getOffersByUser = ({ userId, search, category, minRating, createdFrom, createdTo, page = 1, limit }: GetOffersByUserId): Promise<ApiResponse<Offer[]>> => {
    return OfferService.offersByUser(userId, search, category, minRating, createdFrom, createdTo, page, limit);
};

export const useOffersByUser = ({ userId, search, category, minRating, createdFrom, createdTo, limit = 8 }: GetOffersByUserId) => {

    const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage, isError, error } = useInfiniteQuery({
        queryKey: ['offers', "userId", userId, search, category, minRating, createdFrom, createdTo, limit],
        queryFn: ({ pageParam = 1 }) => getOffersByUser({ userId, search, category, minRating, createdFrom, createdTo, page: pageParam, limit }),

        getNextPageParam: (lastPage) => {
            if (!lastPage.meta) return undefined;

            const currentPage = Number(lastPage.meta.page);
            const totalPages = Number(lastPage.meta.totalPages);

            return currentPage < totalPages ? currentPage + 1 : undefined;
        },
        initialPageParam: 1,
        enabled: !!userId,

    });

    return {
        data,
        isFetching,
        fetchNextPage,
        hasNextPage,
        isError,
        error,
        isFetchingNextPage
    };
};

