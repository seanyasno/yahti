import React from 'react';
import {Button, Divider, Grid, Typography} from '@mui/material';
import {ActivityType} from '@abstraction/enums';
import styled from '@emotion/styled';
import {theme} from '@styles/theme/theme';

export const EmojiButton = styled(Button)`
  border-radius: 50%;
  aspect-ratio: 1/1;
  font-size: 2rem;
  min-width: 80px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const ContinueButton = styled(Button)`
  padding: 12px 80px;
  font-size: 1.2rem;
  border-radius: 1em;
  position: absolute;
  bottom: 20px;
`;

export const emojiByActivityType: { [key: string]: string } = {
    [ActivityType.HOME]: '🏠',
    [ActivityType.RESTAURANT]: '🍽️',
    [ActivityType.TRIP]: '🚌',
    [ActivityType.SHOPPING]: '🛍️',
    [ActivityType.SPORT]: '🏃‍♂️',
    [ActivityType.LOVING]: '❤️',
    [ActivityType.GAMING]: '🎮',
    [ActivityType.ESCAPE_ROOM]: '🔓',
    [ActivityType.OTHER]: '🤷‍♂️',
};

type Props = {}

export const ActivitySelection: React.FC<Props> = (props) => {
    const title = 'צריך לבחור פעילות';
    const subtitle = 'אבל לבחור רק משהו אחד כפרה עליך';
    const buttonTitle = 'היידה נמשיך';
    const buttonTitleDisabled = 'איך נמשיך אם לא בחרת';

    const [selectedActivity, setSelectedActivity] = React.useState<ActivityType | null>(null);

    return (
        <Grid container maxWidth={'sm'} justifyContent={'center'}>
            <Typography variant={'h4'} fontWeight={600}>{title}</Typography>
            <Typography variant={'subtitle1'} color={'#5D5E62'} fontWeight={300}>{subtitle}</Typography>

            <Divider sx={{
                width: '80%',
                margin: '30px 0'
            }}/>

            <Grid container rowSpacing={2} display={'flex'}>
                {
                    Object.values(ActivityType).map((activityType, index) => (
                        <Grid
                            item
                            xs={4}
                            key={index}
                            textAlign={'center'}>
                            <EmojiButton
                                variant={'contained'}
                                onClick={() => setSelectedActivity(currentActivity => currentActivity === activityType ? null : activityType)}
                                sx={{border: selectedActivity === activityType ? `1px solid ${theme.palette.secondary.main}`  : 'none'}}
                            >
                                {emojiByActivityType[activityType]}
                            </EmojiButton>
                            <Typography mt={'8px'} fontWeight={500}>{activityType}</Typography>
                        </Grid>
                    ))
                }
            </Grid>

            <ContinueButton disabled={!selectedActivity} variant={'contained'} color={'secondary'}>{selectedActivity ? buttonTitle : buttonTitleDisabled}</ContinueButton>
        </Grid>
    );
};
