import React from 'react';
import {NextPage} from 'next';
import {ActivitySelection} from '@components/index';
import {Box} from '@mui/material';

const CreateActivityPage: NextPage = () => {
    return (
        <Box sx={{margin: '40px 20px',}}>
            <ActivitySelection/>
        </Box>
    );
}

export default CreateActivityPage;
