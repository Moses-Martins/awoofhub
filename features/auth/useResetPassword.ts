import { useMutation } from '@tanstack/react-query';
import { resetPasswordService } from '../../services/auth-service';
import { ResetPasswordData } from '../../types/auth';

export const resetPassword = async (data: ResetPasswordData): Promise<any> => {
    const result = await resetPasswordService(data);
    return result.data;
};

type UseResetPasswordOptions = {
    onSuccess?: () => void;
};

export const useResetPassword = ({ onSuccess }: UseResetPasswordOptions = {}) => {
    const { mutate: submit, isPending } = useMutation({
        mutationFn: resetPassword,
        onSuccess: () => {
            onSuccess?.();
        },
    });
    return { submit, isPending };
};

