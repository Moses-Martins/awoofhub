
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AlertService from "../../services/alert-service";

type removeAlertOptions = {
    id: string;
};

export const RemoveAlert = async ({ id }: removeAlertOptions): Promise<any> => {
    const result = await AlertService.removeAlert(id);
    return result.data
};

export const useRemoveAlert = ({ id }: removeAlertOptions) => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => RemoveAlert({ id }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['alert', id] });
        },
    });

    return { removeAlert: mutate, isPending };
};
