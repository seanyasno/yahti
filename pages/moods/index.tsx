import React, {useState} from 'react';

import { NextPage } from 'next';
import Image from 'next/image';

import {Box, Button, Container, Snackbar, Stack} from '@mui/material';
import axios from 'axios';

import { useMoods } from '@features/activities/hooks/use-moods/use-moods';
import {LoadingScreen} from '@components/loading-screen/loading-screen';
import {useUserDetails} from '@hooks/use-user-details/use-user-details';
import {IoIosArrowBack} from 'react-icons/io';
import {StyledIconButton} from '@styles/create-activity/create-activity-styles';
import {useRouter} from 'next/router';

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
export type MoodType = typeof MOOD_TYPES[keyof typeof MOOD_TYPES];

const MoodItem: React.FC<{ moodType: MoodType }> = ({ moodType }) => {
    const { data: moods } = useMoods();
    const {data: userDetails} = useUserDetails();
    const [sendMoodMessage, setSendMoodMessage] = useState('');

    const onClick = async () => {
        try {
            const mood = moods.find((mood) => mood.moodType === moodType);

            await axios.post('/api/notification', {
                notification: {
                    title: mood.title,
                    body: mood.description,
                },
                token: userDetails.otherToken,
            });
            setSendMoodMessage(mood.description);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Snackbar
                autoHideDuration={3000}
                open={!!sendMoodMessage}
                message={sendMoodMessage}
                onClose={() => setSendMoodMessage('')}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            />
            <Button
                sx={{
                    display: 'flex',
                    flex: 1,
                    backgroundColor: '#fff',
                    borderRadius: '1em',
                    boxShadow: '0px 0px 6px 0px rgba(0,0,0,0.25)',
                }}
                onClick={() => onClick()}
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
        </>
    );
};

const MoodsPage: NextPage = () => {
    const { data: moods, isLoading } = useMoods();
    const router = useRouter();

    if (isLoading) {
        return <LoadingScreen/>;
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
            <StyledIconButton color={'secondary'} onClick={() => router.back()} sx={{
                width: 'fit-content',
            }}>
                <IoIosArrowBack size={20} />
            </StyledIconButton>

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
