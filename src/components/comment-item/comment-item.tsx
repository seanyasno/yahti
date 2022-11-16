import React from 'react';

import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import TimeAgo from 'javascript-time-ago';

import { Comment } from '@abstraction/types';

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

    return (
        <Card>
            <Typography variant={'body1'}>{comment.content}</Typography>
            <Typography variant={'body2'} color={'#7e7e7e'}>
                {timeAgo.format(comment.createdAt)}
            </Typography>
        </Card>
    );
};
