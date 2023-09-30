import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { isEmpty } from 'lodash';

import { Comment } from '@abstraction/types';
import { fetchCommentsByActivityId } from '@requests/index';

export const useComments = (
  activityId: string,
  options?: UseQueryOptions<Comment[]>
) => {
  return useQuery<Comment[]>({
    queryKey: ['comments', activityId],
    queryFn: () => fetchCommentsByActivityId(activityId),
    enabled: !isEmpty(activityId),
    ...options,
  });
};
