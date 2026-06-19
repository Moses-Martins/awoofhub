"use client"
import OfferService from "@/services/offer-service";
import { User } from '@/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type grabOfferOptions = {
    id: string;
    onSuccess?: (user: User) => void;
};

export const GrabOffer = async ({ id }: grabOfferOptions): Promise<any> => {
    const result = await OfferService.grab(id);
    return result.data
};

export const useGrabOffer = ({ id, onSuccess = () => {} }: grabOfferOptions) => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => GrabOffer({ id }),
        onSuccess: (data) => {
            queryClient.setQueryData(['grab', id], data);
            onSuccess?.(data);
        },
    });

    return { grabOffer: mutate, isPending };
};