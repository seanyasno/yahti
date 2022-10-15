import React from 'react';
import {Activity} from '@abstraction/types';
import styled from '@emotion/styled';
import {Card, Typography} from '@mui/material';

export const Container = styled(Card)`
  border-radius: 1em;
  padding: 20px;
`;

type Props = {
    activity: Activity;
}

export const ActivityItem: React.FC<Props> = (props) => {
    const {activity} = props;

    return (
        <Container elevation={0}>
            <Typography variant={'subtitle1'} fontWeight={600}>{activity.title}</Typography>
            <Typography variant={'body2'}>{activity.title}</Typography>
        </Container>
    );
};
