import type {NextPage} from 'next';
import {Container, Paper, Stack, Typography} from '@mui/material';
import {activitiesMock} from '@mocks/index';
import {ActivityItem} from '@components/activity-item/activity-item';

const Home: NextPage = () => {
    const title = 'יואואוו שלום';

    return (
        <Container maxWidth={'sm'}>
            <Typography variant={'h3'} fontWeight={600}>{title}</Typography>

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
