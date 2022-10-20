import React from 'react';
import {Activity} from '@abstraction/types';
import styled from '@emotion/styled';
import {Avatar, Card, IconButton, Stack, Typography} from '@mui/material';
import {emojiByActivityType} from '@constants/index';
import {GoLinkExternal} from 'react-icons/go';
import {openUrlInNewTab} from '@utils/index';

export const Container = styled(Card)`
  border-radius: 1em;
  padding: 16px 20px;
`;

export const ActivityType = styled(Avatar)`
  background-color: #F1F1F1;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: 24px;
  height: 24px;
  font-size: 12px;
`;

type Props = {
    activity: Activity;
}

export const ActivityItem: React.FC<Props> = (props) => {
    const {activity} = props;

    return (
        <Container elevation={0}>
            <Typography mb={'4px'} variant={'h6'} fontWeight={600}>{activity.title}</Typography>

            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} textAlign={'center'}>
                    <ActivityType>
                        {emojiByActivityType[activity.type]}
                    </ActivityType>

                {
                    activity.link &&
                    <IconButton sx={{padding: 0}} onClick={() => openUrlInNewTab(activity.link)}>
                        <GoLinkExternal size={'20px'}/>
                    </IconButton>
                }
            </Stack>
        </Container>
    );
};
