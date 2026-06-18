'use client'
import { useQuery } from '@tanstack/react-query';
import OfferService from '../../services/offer-service';
import { ApiResponse } from '../../types/api-response';
import { Offer } from '../../types/offer';


type GetOffersByBusinessId = {
    businessId: string,
    search: string,
    category: string,
    minRating: number,
    createdFrom: string,
    createdTo: string,
    page: number,
    limit: number,
};

export const getOffersByBusiness = ({ businessId, search, category, minRating, createdFrom, createdTo, page, limit }: GetOffersByBusinessId): Promise<ApiResponse<Offer[]>> => {
    return OfferService.offersByUser(businessId, search, category, minRating, createdFrom, createdTo, page, limit);
};

export const useOffersByBusiness = ({ businessId, search, category, minRating, createdFrom, createdTo, page, limit = 10 }: GetOffersByBusinessId) => {

    const { data, isFetching, isError, error } = useQuery({
        queryKey: ['offers', "businessId", businessId, search, category, minRating, createdFrom, createdTo, page, limit],
        queryFn: () => getOffersByBusiness({ businessId, search, category, minRating, createdFrom, createdTo, page, limit }),
        enabled: !!businessId,
    });

    return {
        data,
        isFetching,
        isError,
        error
    };
};

