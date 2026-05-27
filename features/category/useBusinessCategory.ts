import { useQuery } from '@tanstack/react-query';
import CategoryService from '../../services/category-service';
import { Category } from '../../types/category';


export const getBusinessCategory = async (): Promise<Category[]> => {
    const result = await CategoryService.getAllBusinessCategory();
    return result.data;
};

export const useBusinessCategory = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["business", 'category'],
        queryFn: () => getBusinessCategory(),
        initialData: []
    });

    return {
        data,
        isLoading
    };
};

