
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginService } from "../../services/auth-service";
import { LoginData } from '../../types/auth';
import { User } from '../../types/user';

export const login = async (data: LoginData): Promise<User> => {
  const result = await loginService(data);
  return result.data;
};

type UseLoginOptions = {
  onSuccess?: (user: User) => void;
};

export const useLogin = ({ onSuccess }: UseLoginOptions = {}) => {
  const queryClient = useQueryClient();

  const { mutate: submit, isPending, isError, error} = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryData(['auth-user'], data);
      onSuccess?.(data);
    },
  });

  return { submit, isPending, isError, error};
};
