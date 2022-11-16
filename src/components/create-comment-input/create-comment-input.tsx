import React, { useState } from 'react';

import { IoSend, IoSendOutline } from 'react-icons/io5';

import { auth } from '@config/index';
import styled from '@emotion/styled';
import { IconButton, Input } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isEmpty } from 'lodash';

import { createComment } from '@requests/index';
import { theme } from '@styles/index';

export const StyledInput = styled(Input)`
    background-color: #fff;
    border-radius: 1em;
    padding: 12px 12px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

type Props = {
    activityId: string;
};

export const CreateCommentInput: React.FC<Props> = (props) => {
    const { activityId } = props;
    const queryClient = useQueryClient();
    const [content, setContent] = useState('');

    const { mutateAsync: onCreateComment, isLoading: isCreatingComment } =
        useMutation({
            mutationFn: async () => {
                const createdComment = await createComment(
                    {
                        authorId: auth.currentUser.email,
                        content,
                        createdAt: new Date(Date.now()),
                    },
                    activityId
                );

                queryClient.setQueryData(
                    ['comments', activityId],
                    (oldData: Comment[]) => {
                        return [...oldData, createdComment];
                    }
                );

                setContent('');
            },
        });

    const placeholder = 'יש לך משהו להוסיף?';

    return (
        <StyledInput
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder={placeholder}
            multiline
            disabled={isCreatingComment}
            endAdornment={
                <IconButton
                    sx={{ padding: 0 }}
                    onClick={() => onCreateComment()}
                    disabled={isEmpty(content) || isCreatingComment}
                >
                    {content ? (
                        <IoSend
                            color={theme.palette.secondary.main}
                            style={{
                                transform: 'rotate(180deg)',
                            }}
                        />
                    ) : (
                        <IoSendOutline
                            style={{
                                transform: 'rotate(180deg)',
                            }}
                        />
                    )}
                </IconButton>
            }
        />
    );
};
