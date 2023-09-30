import React, { useCallback, useState } from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { IoIosArrowBack } from 'react-icons/io';

import { Alert, Container, Snackbar, Stack } from '@mui/material';

import { Mood, MOOD_TYPES, MoodType } from '@abstraction/types';
import { LoadingScreen } from '@components/index';
import { MoodItem, useMoods, useSendMoodNotification } from '@features/moods';
import { StyledIconButton } from '@styles/create-activity/create-activity-styles';

/*
זהווו מספיק😇💪🏻
אני עייפה😴
משעמם לי🫠
אין פוטוטו איתי🥺❤️
חיבוקיייי🫂🫂
אני אוהבת אותך המון❤️🥹
אני מתגעגעת❤️
לשתות מים חשוב🥹🫗
ישר👉🏻👉🏻
 */

const MoodsPage: NextPage = () => {
  const { data: moods, isLoading } = useMoods();
  const router = useRouter();
  const [sendMoodMessage, setSendMoodMessage] = useState('');

  const { mutate: sendMoodNotification } = useSendMoodNotification({
    onSuccess: (mood) => {
      setSendMoodMessage(mood.title);
    },
  });

  const gettingMoodByType = useCallback(
    (moodType: MoodType) => getMoodByType(moods, moodType),
    [moods]
  );

  const sendingNotification = (moodType: MoodType) => () => {
    const mood = gettingMoodByType(moodType);
    sendMoodNotification(mood);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Container
      maxWidth={'sm'}
      sx={{
        padding: '30px 20px',
        height: '100vh',
        display: 'flex',
        flexFlow: 'column',
        gap: '12px',
      }}
    >
      <Snackbar
        autoHideDuration={3000}
        open={!!sendMoodMessage}
        onClose={() => setSendMoodMessage('')}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert onClose={() => setSendMoodMessage('')} severity={'success'}>
          {sendMoodMessage}
        </Alert>
      </Snackbar>

      <StyledIconButton
        color={'secondary'}
        onClick={() => router.back()}
        sx={{
          width: 'fit-content',
        }}
      >
        <IoIosArrowBack size={20} />
      </StyledIconButton>

      <Stack direction={'row'} height={'100%'} gap={'12px'}>
        <Stack direction={'column'} height={'100%'} flex={1} gap={'12px'}>
          <MoodItem
            mood={gettingMoodByType(MOOD_TYPES.Hungry)}
            onClick={sendingNotification(MOOD_TYPES.Hungry)}
          />
        </Stack>
        <Stack direction={'column'} height={'100%'} flex={1} gap={'12px'}>
          <MoodItem
            mood={gettingMoodByType(MOOD_TYPES.Sad)}
            onClick={sendingNotification(MOOD_TYPES.Sad)}
          />
          <MoodItem
            mood={gettingMoodByType(MOOD_TYPES.Oof)}
            onClick={sendingNotification(MOOD_TYPES.Oof)}
          />
        </Stack>
      </Stack>

      <Stack direction={'row'} height={'100%'} gap={'12px'}>
        <MoodItem
          mood={gettingMoodByType(MOOD_TYPES.Happy)}
          onClick={sendingNotification(MOOD_TYPES.Happy)}
        />
        <MoodItem
          mood={gettingMoodByType(MOOD_TYPES.Shock)}
          onClick={sendingNotification(MOOD_TYPES.Shock)}
        />
      </Stack>

      <Stack direction={'row'} height={'100%'} gap={'12px'}>
        <MoodItem
          mood={gettingMoodByType(MOOD_TYPES.Hug)}
          onClick={sendingNotification(MOOD_TYPES.Hug)}
        />
        <MoodItem
          mood={gettingMoodByType(MOOD_TYPES.SuperLove)}
          onClick={sendingNotification(MOOD_TYPES.SuperLove)}
        />
      </Stack>

      <Stack direction={'row'} height={'100%'} gap={'12px'}>
        <MoodItem
          mood={gettingMoodByType(MOOD_TYPES.Love)}
          onClick={sendingNotification(MOOD_TYPES.Love)}
        />
      </Stack>
    </Container>
  );
};

export default MoodsPage;

function getMoodByType(moods: Mood[], moodType: MoodType) {
  return moods.find((mood) => moodType === mood.moodType);
}
