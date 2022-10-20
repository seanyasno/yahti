import React, {useCallback, useContext} from 'react';
import {Button, Divider, Grid, Typography} from '@mui/material';
import {ActivityType} from '@abstraction/enums';
import styled from '@emotion/styled';
import {theme} from '@styles/theme/theme';
import {ActivityCreationContext} from '@contexts/activity-creation-context/activity-creation-context';

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

type Props = {
    next?: () => void;
}

export const ActivitySelection: React.FC<Props> = (props) => {
    const {next} = props;
    const {activity, setActivity} = useContext(ActivityCreationContext);
    const title = 'צריך לבחור פעילות';
    const subtitle = 'אבל לבחור רק משהו אחד חיימשלי';
    const buttonTitle = 'היידה נמשיך';
    const buttonTitleDisabled = 'איך נמשיך אם לא בחרת';

    // const [selectedType, setType] = React.useState<ActivityType | null>(activity?.type);

    const onTypeSelected = useCallback((type: ActivityType) => {
        if (activity?.type === type) {
            console.log('');
            setActivity({type: null});
        } else {
            setActivity({type});
        }
    }, [activity?.type, setActivity]);

    return (
        <Grid container maxWidth={'sm'} justifyContent={'center'}>
            <Typography variant={'h4'} fontWeight={600}>{title}</Typography>
            <Typography variant={'subtitle1'} color={'#5D5E62'} fontWeight={300}>{subtitle}</Typography>

            <Divider sx={{
                width: '80%',
                margin: '20px 0'
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
                                onClick={() => onTypeSelected(activityType)}
                                sx={{border: activity?.type === activityType ? `1px solid ${theme.palette.secondary.main}` : 'none'}}
                            >
                                {emojiByActivityType[activityType]}
                            </EmojiButton>
                            <Typography mt={'8px'} fontWeight={500}>{activityType}</Typography>
                        </Grid>
                    ))
                }
            </Grid>

            <ContinueButton
                disabled={!activity?.type}
                variant={'contained'}
                color={'secondary'}
                onClick={next}
            >
                {activity?.type ? buttonTitle : buttonTitleDisabled}
            </ContinueButton>
        </Grid>
    );
};
