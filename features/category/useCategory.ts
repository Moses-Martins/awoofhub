import { useQuery } from '@tanstack/react-query';
import CategoryService from '../../services/category-service';
import { Category } from '../../types/category';


export const getCategory = async (): Promise<Category[]> => {
    const result = await CategoryService.getAllCategory();
    return result.data;
};


export const useCategory = () => {
    const { data, isFetching, isFetched } = useQuery({
        queryKey: ['category'],
        queryFn: () => getCategory(),
        initialData: []
    });

    return {
        data,
        isFetching,
        isFetched
    };
};

