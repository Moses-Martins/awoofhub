
import { useQuery } from '@tanstack/react-query';
import { getUserByIdService } from '../../services/user-service';
import { User } from '../../types/user';


type GetUserOptions = {
    id: string;
};

export const getUserById = async ({id}: GetUserOptions): Promise<User> => {
    const result = await getUserByIdService(id);
    return result.data; 
}; 

export const useUserById = ({id}: GetUserOptions) => {
    const { data, isLoading } = useQuery({
        queryKey: ["user", id],
        queryFn: () => getUserById({id}),
    });
    
    return { data, isLoading };
};


