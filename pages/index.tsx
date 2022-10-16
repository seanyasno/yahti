import type {NextPage} from 'next';
import {Container, Stack, Typography, Fab} from '@mui/material';
import {activitiesMock} from '@mocks/index';
import {ActivityItem} from '@components/index';
import {MdAdd} from 'react-icons/md';


const Home: NextPage = () => {
    const title = 'יואואוו שלום';

    return (
        <Container maxWidth={'sm'}>
            <Typography variant={'h4'} fontWeight={600}>{title}</Typography>

            <Stack
                direction={'column'}
                spacing={2}
            >
                {
                    activitiesMock.map((activity, index) => <ActivityItem activity={activity} key={index}/>)
                }
            </Stack>

            <Fab color={'secondary'} aria-label="add">
                <MdAdd size={26}/>
            </Fab>
        </Container>
    );
};

export default Home;
