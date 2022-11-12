import { useEffect, useMemo, useState } from 'react';
import React from 'react';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { MdAdd } from 'react-icons/md';

import { auth } from '@config/index';
import styled from '@emotion/styled';
import {
    Box,
    Container,
    Fab,
    Input,
    Stack,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useAuthState } from 'react-firebase-hooks/auth';

import { ActivityItem, LoadingScreen } from '@components/index';
import { useUserDetails } from '@hooks/index';
import { fetchActivities } from '@requests/firestore-requests/firestore-requests';
import { theme } from '@styles/index';

export const StyledTabs = styled(Tabs)`
    margin: 0 0 20px 0;

    & .MuiTabs-indicator {
        display: none;
        background-color: red;
    }
`;

export const StyledTab = styled(Tab)`
    color: ${theme.palette.text.primary};
    font-size: 1rem;

    &.Mui-selected {
        color: ${theme.palette.text.secondary};
        background-color: ${theme.palette.secondary.main};
        border-radius: 2em;
        font-weight: 700;
        font-size: 1rem;
    }
`;

const HomePage: NextPage = () => {
    const router = useRouter();
    const [currentTab, setCurrentTab] = useState(0);
    const [activitySearchText, setActivitySearchText] = useState('');
    const { data: activities = [], isLoading: loadingActivities } = useQuery({
        queryKey: ['activities'],
        queryFn: async () => fetchActivities(),
    });

    const filteredActivities = useMemo(() => {
        if (isEmpty(activitySearchText)) {
            return activities;
        }

        return activities.filter(({ activity }) =>
            activity.title
                .toLowerCase()
                .includes(activitySearchText.toLowerCase())
        );
    }, [activities, activitySearchText]);

    const { data: userDetails, isLoading: loadingUserDetails } =
        useUserDetails();

    const doneActivities = useMemo(
        () => filteredActivities.filter(({ activity }) => activity.done),
        [filteredActivities]
    );
    const notDoneActivities = useMemo(
        () => filteredActivities.filter(({ activity }) => !activity.done),
        [filteredActivities]
    );
    const [user, loading, error] = useAuthState(auth);

    const title = 'יואואוו שלום';
    const searchActivityPlaceholder = 'יאללה נחפש פעילות';

    const onAddActivity = () => router.push('/create-activity');

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/login');
        }
    }, [loading, router, user]);

    if (loading || loadingActivities || loadingUserDetails) {
        return <LoadingScreen />;
    }

    return (
        <Container maxWidth={'sm'} sx={{ padding: '30px 20px' }}>
            <Typography variant={'h4'} fontWeight={600} mb={'8px'}>
                {title} {userDetails.name}
            </Typography>

            <Input
                placeholder={searchActivityPlaceholder}
                sx={{ mb: '12px' }}
                onChange={(event) => setActivitySearchText(event.target.value)}
            />

            <StyledTabs
                value={currentTab}
                variant={'fullWidth'}
                onChange={(event, newValue) => setCurrentTab(newValue)}
            >
                <StyledTab label={'מה נעשה'} value={0} />
                <StyledTab label={'מה עשינו'} value={1} />
            </StyledTabs>

            <Stack direction={'column'} spacing={2}>
                {currentTab === 0 &&
                    notDoneActivities.map(({ activity, id }, index) => (
                        <Box
                            onClick={() => router.push(`/activity/${id}`)}
                            key={index}
                        >
                            <ActivityItem id={id} activity={activity} />
                        </Box>
                    ))}

                {currentTab === 1 &&
                    doneActivities.map(({ activity, id }, index) => (
                        <Box
                            onClick={() => router.push(`/activity/${id}`)}
                            key={index}
                        >
                            <ActivityItem id={id} activity={activity} />
                        </Box>
                    ))}
            </Stack>

            <Fab color={'secondary'} aria-label={'add'} onClick={onAddActivity}>
                <MdAdd size={26} />
            </Fab>
        </Container>
    );
};

export default HomePage;
