import { auth } from '@config/index';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { UserDetails } from '@abstraction/types';
import { fetchUserDetailsByEmail } from '@requests/firestore-requests/firestore-requests';

export const useUserDetails = (options?: UseQueryOptions<UserDetails>) => {
    return useQuery<UserDetails>({
        queryKey: ['user'],
        queryFn: async () => fetchUserDetailsByEmail(auth.currentUser.email),
        ...options,
    });
};
