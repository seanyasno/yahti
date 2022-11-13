import { useEffect, useMemo, useState } from 'react';
import React from 'react';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { BsFillFilterCircleFill, BsFilterCircle } from 'react-icons/bs';
import { MdAdd } from 'react-icons/md';

import { auth } from '@config/index';
import styled from '@emotion/styled';
import {
    Box,
    Container,
    Fab,
    IconButton,
    Input,
    Stack,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useAuthState } from 'react-firebase-hooks/auth';

import { ActivityType } from '@abstraction/enums';
import {
    ActivityItem,
    FilterActivitiesDrawer,
    LoadingScreen,
} from '@components/index';
import { useUserDetails } from '@hooks/index';
import { fetchActivities } from '@requests/index';
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
    const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
    const [filteredTypes, setFilteredTypes] = useState<ActivityType[]>([]);
    const { data: activities = [], isLoading: loadingActivities } = useQuery({
        queryKey: ['activities'],
        queryFn: async () => fetchActivities(),
    });

    const hasFilter = useMemo(() => {
        return filteredTypes.length > 0;
    }, [filteredTypes]);

    const filteredActivities = useMemo(() => {
        let filteredActivitiesByTypes = [];

        if (filteredTypes.length === 0) {
            filteredActivitiesByTypes = activities;
        } else {
            filteredActivitiesByTypes = activities.filter(({ activity }) =>
                activity.types.some((type) => filteredTypes.includes(type))
            );
        }

        if (isEmpty(activitySearchText)) {
            return filteredActivitiesByTypes;
        }

        return filteredActivitiesByTypes.filter(({ activity }) =>
            activity.title
                .toLowerCase()
                .includes(activitySearchText.toLowerCase())
        );
    }, [activities, activitySearchText, filteredTypes]);

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
    const [user, loading] = useAuthState(auth);

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

            <Stack direction={'row'} mb={'12px'}>
                <Input
                    placeholder={searchActivityPlaceholder}
                    onChange={(event) =>
                        setActivitySearchText(event.target.value)
                    }
                />

                <IconButton
                    sx={{ padding: 0 }}
                    onClick={() => setOpenFilterDrawer(true)}
                >
                    {hasFilter ? (
                        <BsFillFilterCircleFill
                            color={theme.palette.secondary.main}
                        />
                    ) : (
                        <BsFilterCircle color={theme.palette.text.primary} />
                    )}
                </IconButton>

                <FilterActivitiesDrawer
                    open={openFilterDrawer}
                    onClose={() => setOpenFilterDrawer(false)}
                    onOpen={() => setOpenFilterDrawer(true)}
                    onFilter={(types) => setFilteredTypes(types)}
                />
            </Stack>

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
