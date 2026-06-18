import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserService } from "../../services/user-service";
import { UpdateUserData, User } from '../../types/user';

export const updateUser = async (data: UpdateUserData): Promise<User> => {
    const result = await updateUserService(data);
    return result.data;
};

type UseUpdateUserOptions = {
    onSuccess?: (user: User) => void;
};

export const useUpdateUser = ({ onSuccess }: UseUpdateUserOptions = {}) => {
    const queryClient = useQueryClient();
    
    const { mutate: submit, isPending } = useMutation({
        mutationFn: updateUser,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['auth-user'] });
            onSuccess?.(data);
        },
    });
    return { submit, isPending };
};

