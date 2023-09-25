import React from 'react';

import { NextPage } from 'next';
import Image from 'next/image';

import { Box, Button, Container, Stack } from '@mui/material';

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

const MOOD_TYPES = {
    Happy: 'happy',
    Hug: 'hug',
    Hungry: 'hungry',
    Love: 'love',
    Oof: 'oof',
    Sad: 'sad',
    Shock: 'shock',
    SuperLove: 'superLove',
} as const;
type MoodType = typeof MOOD_TYPES[keyof typeof MOOD_TYPES];

const MoodItem: React.FC<{ moodType: MoodType }> = ({ moodType }) => {
    return (
        <Button
            sx={{
                display: 'flex',
                flex: 1,
                backgroundColor: '#fff',
                borderRadius: '1em',
                boxShadow: '0px 0px 6px 0px rgba(0,0,0,0.25)',
            }}
            onClick={() => alert(moodType)}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                }}
            >
                <Image
                    src={`/svgs/${moodType}.svg`}
                    alt={moodType}
                    layout={'fill'}
                />
            </Box>
        </Button>
    );
};

const MoodsPage: NextPage = () => {
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
            <Stack direction={'row'} height={'100%'} gap={'12px'}>
                <Stack
                    direction={'column'}
                    height={'100%'}
                    flex={1}
                    gap={'12px'}
                >
                    <MoodItem moodType={MOOD_TYPES.Hungry} />
                </Stack>
                <Stack
                    direction={'column'}
                    height={'100%'}
                    flex={1}
                    gap={'12px'}
                >
                    <MoodItem moodType={MOOD_TYPES.Sad} />
                    <MoodItem moodType={MOOD_TYPES.Oof} />
                </Stack>
            </Stack>

            <Stack direction={'row'} height={'100%'} gap={'12px'}>
                <MoodItem moodType={MOOD_TYPES.Happy} />
                <MoodItem moodType={MOOD_TYPES.Shock} />
            </Stack>

            <Stack direction={'row'} height={'100%'} gap={'12px'}>
                <MoodItem moodType={MOOD_TYPES.Hug} />
                <MoodItem moodType={MOOD_TYPES.SuperLove} />
            </Stack>

            <Stack direction={'row'} height={'100%'} gap={'12px'}>
                <MoodItem moodType={MOOD_TYPES.Love} />
            </Stack>
        </Container>
    );
};

export default MoodsPage;
