import type {NextPage} from 'next';
import {Container, Stack, Typography, Fab, Tabs, Tab, Box} from '@mui/material';
import {ActivityItem, LoadingScreen} from '@components/index';
import {MdAdd} from 'react-icons/md';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import {collection, getDocs} from '@firebase/firestore';
import {auth, db} from '@config/index';
import {Activity} from '@abstraction/types';
import styled from '@emotion/styled';
import {theme} from '@styles/index';
import {useEffect, useMemo, useState} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';

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
    const {data: activities = [], isLoading: loadingActivities} = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
            const querySnapshot = await getDocs(collection(db, 'activities'));
            return querySnapshot.docs.map((doc) => ({
                activity: doc.data(),
                id: doc.id,
            })) as { activity: Activity, id: string }[];
        },
    });
    const doneActivities = useMemo(() => activities.filter(({activity}) => activity.done), [activities]);
    const notDoneActivities = useMemo(() => activities.filter(({activity}) => !activity.done), [activities]);
    const [user, loading, error] = useAuthState(auth);

    const title = 'יואואוו שלום';

    const onAddActivity = () => router.push('/create-activity');

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/login');
        }
    }, [loading, router, user]);

    if (loading || loadingActivities) {
        return <LoadingScreen/>;
    }

    return (
        <Container maxWidth={'sm'} sx={{padding: '30px 20px'}}>
            <Typography variant={'h4'} fontWeight={600} mb={'18px'}>{title}</Typography>

            <StyledTabs
                value={currentTab}
                variant={'fullWidth'}
                onChange={(event, newValue) => setCurrentTab(newValue)}
            >
                <StyledTab label={'מה נעשה'} value={0}/>
                <StyledTab label={'מה עשינו'} value={1}/>
            </StyledTabs>

            <Stack
                direction={'column'}
                spacing={2}
            >
                {currentTab === 0 && notDoneActivities.map(({activity, id}, index) =>
                    <Box onClick={() => router.push(`/activity/${id}`)} key={index}>
                        <ActivityItem id={id} activity={activity}/>
                    </Box>
                )}

                {currentTab === 1 && doneActivities.map(({activity, id}, index) =>
                    <Box onClick={() => router.push(`/activity/${id}`)} key={index}>
                        <ActivityItem id={id} activity={activity}/>
                    </Box>
                )}
            </Stack>

            <Fab color={'secondary'} aria-label={'add'} onClick={onAddActivity}>
                <MdAdd size={26}/>
            </Fab>
        </Container>
    );
};

export default HomePage;
