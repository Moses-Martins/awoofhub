import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback } from 'react';

type FilterValue = string | number | undefined | null;

export function useFilter(path: string) {
    const params = useLocalSearchParams();
    const router = useRouter();

    const updateFilter = useCallback(
        (keyOrUpdates: string | Record<string, FilterValue>, value?: FilterValue) => {
            const nextParams: Record<string, any> = { ...params };

            if (typeof keyOrUpdates === 'string') {
                if (value) nextParams[keyOrUpdates] = value;
                else delete nextParams[keyOrUpdates];
            } else {
                Object.entries(keyOrUpdates).forEach(([k, v]) => {
                    if (v) nextParams[k] = v;
                    else delete nextParams[k];
                });
            }

            delete nextParams.page;

            const query = new URLSearchParams(nextParams as any).toString();

            router.replace({
                pathname: path as any,
                params: nextParams,
            });
        },
        [params, router, path]
    );

    return updateFilter;
}