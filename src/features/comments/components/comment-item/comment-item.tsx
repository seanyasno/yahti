import React from 'react';

import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import TimeAgo from 'javascript-time-ago';

import { Comment } from '@abstraction/types';
import { fetchUserDetailsByEmail } from '@requests/index';

export const Card = styled.div`
  background-color: #fff;
  padding: 12px 20px;
  border-radius: 1em;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

type Props = {
  comment: Comment;
};

export const CommentItem: React.FC<Props> = (props) => {
  const { comment } = props;
  const timeAgo = new TimeAgo('he');

  const { data: user } = useQuery({
    queryKey: ['user', comment.authorId],
    queryFn: async () => fetchUserDetailsByEmail(comment.authorId),
  });

  return (
    <Card>
      <Typography variant={'subtitle2'}>{user?.name}</Typography>
      <Typography variant={'body1'}>{comment.content}</Typography>
      <Typography variant={'caption'} color={'#7e7e7e'}>
        {timeAgo.format(comment.createdAt)}
      </Typography>
    </Card>
  );
};
