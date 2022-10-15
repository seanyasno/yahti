import type {NextPage} from 'next';
import {Container, Paper, Stack} from '@mui/material';
import {activitiesMock} from '@mocks/index';
import {ActivityItem} from '@components/activity-item/activity-item';

const Home: NextPage = () => {
    return (
        <Container maxWidth={'sm'}>
            <h1>hi</h1>

            <Stack
                direction={'column'}
                spacing={2}
            >
                {
                    activitiesMock.map((activity, index) => <ActivityItem activity={activity} key={index}/>)
                }
            </Stack>
        </Container>
    );
};

export default Home;
