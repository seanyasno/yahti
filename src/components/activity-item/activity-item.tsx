import React, {useCallback} from 'react';
import {Activity} from '@abstraction/types';
import styled from '@emotion/styled';
import {Box, Card, IconButton, Stack, Typography} from '@mui/material';
import {emojiByActivityType} from '@constants/index';
import {GoLinkExternal} from 'react-icons/go';
import {openUrlInNewTab} from '@utils/index';
import {IoCheckmarkDoneCircleOutline, IoCheckmarkDoneCircleSharp} from 'react-icons/io5';
import {ActivityType} from '@styles/index';
import {useToggleActivity} from '@hooks/use-toggle-activity/use-toggle-activity';

export const Container = styled(Card)`
  border-radius: 1em;
  padding: 16px 20px;
`;

type Props = {
    id: string;
    activity: Activity;
}

export const ActivityItem: React.FC<Props> = (props) => {
    const {activity, id} = props;
    const {toggleActivity} = useToggleActivity(activity, id);

    const onDoneClick = useCallback(async (event) => {
        event.stopPropagation();
        try {
            await toggleActivity();
        } catch (error) {
            console.log(error);
        }
    }, [toggleActivity]);

    return (
        <Container elevation={0}>
            <Typography variant={'h6'} fontWeight={600}>{activity.title}</Typography>

            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                textAlign={'center'}
            >

                <Box sx={{display: 'flex', alignItems: 'center', columnGap: '8px'}}>
                    <IconButton sx={{
                        padding: 0, color: activity.done ? '#2a9d8f' : '',
                        zIndex: 100,
                    }} onClick={onDoneClick}>
                        {activity.done ?
                            <IoCheckmarkDoneCircleSharp size={'32px'}/> :
                            <IoCheckmarkDoneCircleOutline size={'32px'}/>}
                    </IconButton>

                    <ActivityType>
                        {emojiByActivityType[activity.type]}
                    </ActivityType>
                </Box>

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
