import { useMutation } from '@tanstack/react-query';
import { forgotPasswordService } from "../../services/auth-service";
import { EmailData } from '../../types/auth';

export const forgotPassword = async (data: EmailData): Promise<any> => {
    const result = await forgotPasswordService(data);
    return result.data;
};

type UseForgotPasswordOptions = {
    onSuccess?: () => void;
};

export const useForgotPassword = ({ onSuccess }: UseForgotPasswordOptions = {}) => {
    const { mutate: submit, isPending } = useMutation({
        mutationFn: forgotPassword,
        onSuccess: () => {
            onSuccess?.();
        },
    });
    return { submit, isPending };
};

