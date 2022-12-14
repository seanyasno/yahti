import { useCallback, useEffect, useMemo, useState } from 'react';
import React from 'react';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { BsFillFilterCircleFill, BsFilterCircle } from 'react-icons/bs';
import { IoMenu } from 'react-icons/io5';
import { MdAdd } from 'react-icons/md';

import { auth } from '@config/index';
import styled from '@emotion/styled';
import {
    Avatar,
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
import { Activity } from '@abstraction/types';
import {
    ActivityItem,
    FilterActivitiesDrawer,
    GroupedActivities,
    HomeDrawer,
    LoadingScreen,
} from '@components/index';
import { useProfilePicture, useUserDetails } from '@hooks/index';
import { fetchActivities } from '@requests/index';
import { StyledBackButton } from '@styles/activity-page/activity-page-styles';
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
    const [openHomeDrawer, setOpenHomeDrawer] = useState(false);
    const [filteredTypes, setFilteredTypes] = useState<ActivityType[]>([]);
    const [groupBy, setGroupBy] = useState('');
    const [user, loading] = useAuthState(auth);
    const { pictureUrl, isLoadingPicture } = useProfilePicture(user?.uid);
    const { data: activities = [], isLoading: loadingActivities } = useQuery({
        queryKey: ['activities'],
        queryFn: async () => fetchActivities(),
    });

    const handleOnFilter = useCallback(
        (types: ActivityType[], groupBy: string) => {
            setFilteredTypes(types);
            setGroupBy(groupBy);
            setOpenFilterDrawer(false);
        },
        []
    );

    const hasFilter = useMemo(
        () => filteredTypes.length > 0 || groupBy,
        [filteredTypes.length, groupBy]
    );

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

    const title = 'יואואוו שלום';
    const searchActivityPlaceholder = 'יאללה נחפש פעילות';

    const onAddActivity = () => router.push('/create-activity');

    const groupedActivities = useCallback(
        (activities: { activity: Activity; id: string }[]) => {
            return Object.values(ActivityType).map((type, index) => {
                return (
                    <GroupedActivities
                        activities={activities}
                        type={type}
                        key={index}
                    />
                );
            });
        },
        [groupBy]
    );

    const activitiesList = useCallback(
        (activities: { activity: Activity; id: string }[]) => {
            return activities.map(({ activity, id }, index) => (
                <Box onClick={() => router.push(`/activity/${id}`)} key={index}>
                    <ActivityItem id={id} activity={activity} />
                </Box>
            ));
        },
        [router, groupBy]
    );

    const contentByTab = useCallback(
        (activities: { activity: Activity; id: string }[]) => {
            if (groupBy) {
                return groupedActivities(activities);
            }

            return activitiesList(activities);
        },
        [router, groupBy]
    );

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/login');
        }
    }, [loading, router, user]);

    if (
        loading ||
        loadingActivities ||
        loadingUserDetails ||
        isLoadingPicture
    ) {
        return <LoadingScreen />;
    }

    return (
        <Container maxWidth={'sm'} sx={{ padding: '30px 20px' }}>
            <Stack
                direction={'row'}
                mb={'12px'}
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <StyledBackButton onClick={() => setOpenHomeDrawer(true)}>
                    <IoMenu color={theme.palette.secondary.main} />
                </StyledBackButton>

                <Avatar src={pictureUrl} />

                <HomeDrawer
                    open={openHomeDrawer}
                    onClose={() => setOpenHomeDrawer(false)}
                    onOpen={() => setOpenHomeDrawer(true)}
                />
            </Stack>

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
                    onFilter={handleOnFilter}
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
                {currentTab === 0 && contentByTab(notDoneActivities)}
                {currentTab === 1 && contentByTab(doneActivities)}
            </Stack>

            <Fab color={'secondary'} aria-label={'add'} onClick={onAddActivity}>
                <MdAdd size={26} />
            </Fab>
        </Container>
    );
};

export default HomePage;
