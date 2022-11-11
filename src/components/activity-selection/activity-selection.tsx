import React, { useCallback, useContext } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import { ActivityType } from '@abstraction/index';
import { EmojiButton, ContinueButton } from './styles';
import { theme } from '@styles/index';
import { ActivityCreationContext } from '@contexts/index';
import { emojiByActivityType } from '@constants/index';

type Props = {
    next?: () => void;
};

export const ActivitySelection: React.FC<Props> = (props) => {
    const { next } = props;
    const { activity, setActivity } = useContext(ActivityCreationContext);
    const title = 'צריך לבחור פעילות';
    const subtitle = 'אבל לבחור רק יותר מאחד חיימשלי';
    const buttonTitle = 'היידה נמשיך';
    const buttonTitleDisabled = 'איך נמשיך אם לא בחרת';

    const onTypeSelected = useCallback(
        (type: ActivityType) => {
            if (activity?.types?.includes(type)) {
                setActivity({
                    types: activity.types.filter(
                        (activityType) => activityType !== type
                    ),
                });
            } else {
                setActivity({
                    types: [...(activity?.types ?? []), type],
                });
            }
        },
        [activity?.types, setActivity]
    );

    const isTypeSelected = useCallback(
        (type: ActivityType) => activity?.types?.includes(type),
        [activity?.types]
    );

    return (
        <Grid container maxWidth={'sm'} justifyContent={'center'}>
            <Typography variant={'h4'} fontWeight={600}>
                {title}
            </Typography>
            <Typography
                variant={'subtitle1'}
                color={'#5D5E62'}
                fontWeight={300}
            >
                {subtitle}
            </Typography>

            <Divider
                sx={{
                    width: '80%',
                    margin: '20px 0',
                }}
            />

            <Grid container rowSpacing={2} display={'flex'}>
                {Object.values(ActivityType).map((activityType, index) => (
                    <Grid item xs={4} key={index} textAlign={'center'}>
                        <EmojiButton
                            variant={'contained'}
                            onClick={() => onTypeSelected(activityType)}
                            sx={{
                                border: isTypeSelected(activityType)
                                    ? `1px solid ${theme.palette.secondary.main}`
                                    : 'none',
                            }}
                        >
                            {emojiByActivityType[activityType]}
                        </EmojiButton>
                        <Typography mt={'8px'} fontWeight={500}>
                            {activityType}
                        </Typography>
                    </Grid>
                ))}
            </Grid>

            <ContinueButton
                disabled={activity?.types?.length === 0}
                variant={'contained'}
                color={'secondary'}
                onClick={next}
            >
                {activity?.types?.length > 0
                    ? buttonTitle
                    : buttonTitleDisabled}
            </ContinueButton>
        </Grid>
    );
};
