
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutService } from "../../services/auth-service";

export const logout = async (): Promise<{}> => {
  const result = await logoutService();
  await AsyncStorage.removeItem('accessToken');
  await AsyncStorage.removeItem('refreshToken');
  return result.data;
};

type UseLogoutOptions = {
  onSuccess?: () => void;
};

export const useLogout = ({ onSuccess }: UseLogoutOptions = {}) => {
  const queryClient = useQueryClient();

  const { mutate: submit, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear()
      onSuccess?.();
    },
  });

  return { submit, isPending };
};
