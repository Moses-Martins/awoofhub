import { useQuery } from '@tanstack/react-query';
import { getUserService } from '../../services/user-service';
import { User } from '../../types/user';


export const getAuthUser = async (): Promise<User> => {
    const result = await getUserService();
    return result.data; 
}; 

export const useUser = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['auth-user'],
        queryFn: () => getAuthUser(),
        retry: false,
    });
    
    return { data, isLoading };
};