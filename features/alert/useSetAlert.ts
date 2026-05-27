
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AlertService from "../../services/alert-service";
import { Alert } from "../../types/alert";

type setAlertOptions = {
    id: string;
};

export const SetAlert = async ({ id }: setAlertOptions): Promise<Alert> => {
    const result = await AlertService.setAlert(id);
    return result.data
};

export const useSetAlert = ({ id }: setAlertOptions) => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => SetAlert({ id }),
        onSuccess: (data) => {
            queryClient.setQueryData(['alert', id], data);
        },
    });

    return { setAlert: mutate, isPending };
};
