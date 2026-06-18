import { useQuery } from '@tanstack/react-query';
import ModerationService from '../../services/moderation-service';
import { Moderation } from '../../types/moderation';

type GetModerationOptions = {
    id: string;
};

export const getModeration = async ({ id }: GetModerationOptions): Promise<Moderation[]> => {
    const result = await ModerationService.history(id);
    return result.data;
};


export const useModeration = ({ id }: GetModerationOptions) => {
    const { data, isFetching, isFetched } = useQuery({
        queryKey: ['moderation'],
        queryFn: () => getModeration({ id }),
        initialData: []
    });

    return {
        data,
        isFetching, 
        isFetched
    };
};

