import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginService } from "../../services/auth-service";
import { LoginData, LoginResponse } from '../../types/auth';
import { User } from '../../types/user';

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const result = await loginService(data);
  await AsyncStorage.setItem('accessToken', result.data.accessToken);
  await AsyncStorage.setItem('refreshToken', result.data.refreshToken);
  return result.data;
};

type UseLoginOptions = {
  onSuccess?: (user: User) => void;
};

export const useLogin = ({ onSuccess }: UseLoginOptions = {}) => {
  const queryClient = useQueryClient();

  const { mutate: submit, isPending, isError, error } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryData(['auth-user'], data);
      onSuccess?.(data.user);
    },
  });

  return { submit, isPending, isError, error };
};
