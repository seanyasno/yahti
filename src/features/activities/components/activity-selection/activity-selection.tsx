import React, { useCallback, useEffect } from 'react';

import { emojiByActivityType } from '@constants/index';
import { Divider, Grid, Typography } from '@mui/material';

import { ActivityType } from '@abstraction/index';
import { useTypeSelection } from '@features/activities';
import { theme } from '@styles/index';

import { ContinueButton, EmojiButton } from './styles';

type Props = {
  initialSelectedTypes?: ActivityType[];
  next?: () => void;
  onDone?: (selectedTypes: ActivityType[]) => void;
};

export const ActivitySelection: React.FC<Props> = (props) => {
  const { initialSelectedTypes = [], onDone } = props;
  const { selectedTypes, setSelectedTypes, onTypeSelected, isTypeSelected } =
    useTypeSelection(initialSelectedTypes);

  const title = 'צריך לבחור פעילות';
  const subtitle = 'אפשר לבחור רק יותר מאחד חיימשלי';
  const buttonTitle = 'היידה נמשיך';
  const buttonTitleDisabled = 'איך נמשיך אם לא בחרת';

  const handleOnDone = useCallback(() => {
    onDone?.(selectedTypes);
  }, [selectedTypes, onDone]);

  useEffect(() => {
    if (initialSelectedTypes) {
      setSelectedTypes(initialSelectedTypes);
    }
  }, [initialSelectedTypes]);

  return (
    <Grid container maxWidth={'sm'} justifyContent={'center'}>
      <Typography variant={'h4'} fontWeight={600}>
        {title}
      </Typography>
      <Typography variant={'subtitle1'} color={'#5D5E62'} fontWeight={300}>
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
        disabled={selectedTypes.length === 0}
        variant={'contained'}
        color={'secondary'}
        onClick={handleOnDone}
      >
        {selectedTypes.length > 0 ? buttonTitle : buttonTitleDisabled}
      </ContinueButton>
    </Grid>
  );
};
