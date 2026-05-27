
import { useMutation } from '@tanstack/react-query';
import { verifyEmailService } from '../../services/auth-service';
import { VerifyEmailData } from '../../types/auth';

export const verifyEmail = async (data: VerifyEmailData): Promise<any> => {
    const result = await verifyEmailService(data);
    return result.data;
};

type UseVerifyEmailOptions = {
    onSuccess?: () => void;
};

export const useVerifyEmail = ({ onSuccess }: UseVerifyEmailOptions = {}) => {
    const { mutate: submit, isPending } = useMutation({
        mutationFn: verifyEmail,
        onSuccess: () => {
            onSuccess?.();
        },
    });
    return { submit, isPending };
};

