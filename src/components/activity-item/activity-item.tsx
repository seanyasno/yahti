import React from 'react';
import {Activity} from '@abstraction/types';
import styled from '@emotion/styled';
import {Card, Typography} from '@mui/material';

export const Container = styled(Card)`
  border-radius: 1em;
  padding: 16px 20px;
`;

type Props = {
    activity: Activity;
}

export const ActivityItem: React.FC<Props> = (props) => {
    const {activity} = props;

    return (
        <Container elevation={0}>
            <Typography variant={'h6'} fontWeight={600}>{activity.title}</Typography>
            <Typography variant={'body2'}>{activity.description}</Typography>
        </Container>
    );
};
