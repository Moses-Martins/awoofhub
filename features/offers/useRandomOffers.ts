'use client'
import { useQuery } from '@tanstack/react-query';
import OfferService from '../../services/offer-service';
import { Offer } from '../../types/offer';


type GetRandomOffersOptions = {
    page: number,
    limit: number,
};

export const getRandomOffers = async ({ page, limit }: GetRandomOffersOptions): Promise<Offer[]> => {
    const result = await OfferService.randomOffers(page, limit);
    return result.data;
};

export const  useRandomOffers = ({ page = 1, limit = 8 }: GetRandomOffersOptions) => {
    const { data, isFetching, isFetched } = useQuery({
        queryKey: ["randomOffers"],
        queryFn: () => getRandomOffers({page, limit}),
        initialData: []
    });

    return {
        data,
        isFetching,
        isFetched
    };
};
