import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchUserDetailsByEmail } from '@requests/firestore-requests/firestore-requests';
import { auth } from '@config/index';
import { UserDetails } from '@abstraction/types';

export const useUserDetails = (options?: UseQueryOptions<UserDetails>) => {
    return useQuery<UserDetails>({
        queryKey: ['user'],
        queryFn: async () => fetchUserDetailsByEmail(auth.currentUser.email),
        ...options,
    });
};
