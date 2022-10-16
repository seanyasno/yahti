import React from 'react';
import {NextPage} from 'next';
import {ActivitySelection} from '@components/index';
import {Box, Button, IconButton} from '@mui/material';
import styled from '@emotion/styled';
import {IoIosArrowBack} from 'react-icons/io';
import {theme} from '@styles/index';
import {useRouter} from 'next/router';

export const BackButton = styled(IconButton)` 
  background-color: ${theme.palette.primary.main};
  border-radius: 12px;
  padding: 12px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  transform: rotate(180deg);
  margin-bottom: 12px;
`;

const CreateActivityPage: NextPage = () => {
    const router = useRouter();

    const onBack = () => router.replace('/');

    return (
        <Box sx={{margin: '20px 20px 40px 20px'}}>
            <BackButton color={'secondary'} onClick={onBack}>
                <IoIosArrowBack size={20}/>
            </BackButton>
            <ActivitySelection/>
        </Box>
    );
}

export default CreateActivityPage;
