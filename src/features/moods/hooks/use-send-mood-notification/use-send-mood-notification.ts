import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import axios from 'axios';

import { Mood } from '@abstraction/types';
import { useUserDetails } from '@hooks/use-user-details/use-user-details';

export function useSendMoodNotification(
  options?: UseMutationOptions<Mood, unknown, Mood>
) {
  const { data: userDetails } = useUserDetails();

  return useMutation({
    mutationFn: async (mood) => {
      await axios.post('/api/notification', {
        notification: {
          title: mood.title,
          body: mood.description,
        },
        token: userDetails.otherToken,
      });

      return mood;
    },
    ...options,
  });
}
