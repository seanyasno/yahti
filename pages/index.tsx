import type {NextPage} from 'next';
import {Container, Stack, Typography, Fab, Tabs, Tab} from '@mui/material';
import {activitiesMock} from '@mocks/index';
import {ActivityItem} from '@components/index';
import {MdAdd} from 'react-icons/md';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import {collection, getDocs} from '@firebase/firestore';
import {db} from '@config/index';
import {Activity} from '@abstraction/types';

const Home: NextPage = () => {
    const router = useRouter();
    const {data: activities = []} = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
            const querySnapshot = await getDocs(collection(db, "activities"));
            return querySnapshot.docs.map((doc) => doc.data()) as Activity[];
        },
    });

    const title = 'יואואוו שלום';

    const onAddActivity = () => router.push('/create-activity');

    return (
        <Container maxWidth={'sm'} sx={{padding: '30px 20px'}}>
            <Typography variant={'h4'} fontWeight={600} mb={'18px'}>{title}</Typography>

            {/*<Tabs*/}
            {/*    value={0}*/}
            {/*    variant={'fullWidth'}*/}
            {/*    textColor={'secondary'}*/}
            {/*    indicatorColor={'secondary'}>*/}
            {/*    <Tab label={'One'}/>*/}
            {/*    <Tab label={'two'}/>*/}
            {/*</Tabs>*/}

            <Stack
                direction={'column'}
                spacing={2}
            >
                {
                    activities.map((activity, index) => <ActivityItem activity={activity} key={index}/>)
                }
            </Stack>

            <Fab color={'secondary'} aria-label="add" onClick={onAddActivity}>
                <MdAdd size={26}/>
            </Fab>
        </Container>
    );
};

export default Home;
