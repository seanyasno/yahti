import { QueryOptions, useQuery } from '@tanstack/react-query';

import { Activity } from '@abstraction/types';
import { fetchActivities } from '@requests/firestore-requests/firestore-requests';

export function useActivities(
    options?: QueryOptions<{ activity: Activity; id: string }[]>
) {
    return useQuery({
        queryKey: ['activities'],
        queryFn: async () => fetchActivities(),
        ...options,
    });
}
