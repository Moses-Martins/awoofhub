'use client'
import OfferService from '@/services/offer-service';
import { Offer } from '@/types/offer';
import { useQuery } from '@tanstack/react-query';


export const getRandomOffers = async (): Promise<Offer[]> => {
    const result = await OfferService.randomOffers();
    return result.data;
};

export const  useRandomOffers = () => {
    const { data, isFetching, isFetched } = useQuery({
        queryKey: ["randomOffers"],
        queryFn: () => getRandomOffers(),
        initialData: []
    });

    return {
        data,
        isFetching,
        isFetched
    };
};