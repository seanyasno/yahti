import {QueryOptions, useQuery} from '@tanstack/react-query';
import {fetchMoods, Mood} from '@requests/firestore-requests/firestore-requests';

export function useMoods(options?: QueryOptions<Mood[]>) {
    return useQuery({
        queryKey: ['moods'],
        queryFn: async () => fetchMoods(),
        ...options,
    });
}