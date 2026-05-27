import { useQuery } from '@tanstack/react-query';
import ModerationService from '../../services/moderation-service';
import { Moderation } from '../../types/moderation';

type GetLatestModerationOptions = {
    id: string;
};

export const getLatestModeration = async ({ id }: GetLatestModerationOptions): Promise<Moderation> => {
    const result = await ModerationService.latestHistory(id);
    return result.data;
};

export const useLatestModeration = ({ id }: GetLatestModerationOptions) => {
    const { data, isLoading } = useQuery({
        queryKey: ['moderation', 'latest'],
        queryFn: () => getLatestModeration({ id }),
    });

    return {
        data,
        isLoading
    };
};

