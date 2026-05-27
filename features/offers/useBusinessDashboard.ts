import { useQuery } from '@tanstack/react-query';
import OfferService from '../../services/offer-service';
import { BusinessDashboard } from '../../types/offer';

export const GetBusinessDashboard = async (): Promise<BusinessDashboard> => {
    const result = await OfferService.businessDashboard()
    return result.data;
};

export const useBusinessDashboard = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['dashboard'],
        queryFn: () => GetBusinessDashboard(),
        refetchInterval: 180000,
        staleTime: 60000,
    });

    return { data, isLoading };
};