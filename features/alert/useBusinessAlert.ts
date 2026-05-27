import { useQuery } from "@tanstack/react-query";
import AlertService from "../../services/alert-service";
import { Alert } from "../../types/alert";

type setAlertOptions = {
    id: string;
};

export const GetBusinessAlert = async ({ id }: setAlertOptions): Promise<Alert | null> => {
    const result = await AlertService.getBusinessAlert(id);
    return result.data
};

export const useBusinessAlert = (id: string) => {
    const { data, isLoading } = useQuery({
        queryKey: ['alert', id],
        queryFn: () => GetBusinessAlert({ id }),
    });


    const isSubscribed = !!data;

    return isSubscribed
};

