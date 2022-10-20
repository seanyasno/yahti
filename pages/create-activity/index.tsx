import React, {useCallback, useState} from 'react';
import {NextPage} from 'next';
import {ActivitySelection, ActivityForm} from '@components/index';
import {Box, Button, IconButton} from '@mui/material';
import styled from '@emotion/styled';
import {IoIosArrowBack} from 'react-icons/io';
import {theme} from '@styles/index';
import {useRouter} from 'next/router';
import {ActivityCreationProvider} from '@contexts/index';

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
    const pages = [
        <ActivitySelection key={'selection'} next={() => setCurrentPage(currentPage => currentPage + 1)}/>,
        <ActivityForm key={'form'}/>
    ];
    const [currentPage, setCurrentPage] = useState(0);

    const onBack = useCallback(async () => {
        if (currentPage === 0) {
            await router.replace('/');
        } else {
            setCurrentPage(currentPage => currentPage - 1);
        }
    }, [currentPage, router]);

    return (
        <ActivityCreationProvider>
            <Box sx={{margin: '20px 20px 40px 20px'}}>
                <BackButton color={'secondary'} onClick={onBack}>
                    <IoIosArrowBack size={20}/>
                </BackButton>

                {pages[currentPage]}
            </Box>
        </ActivityCreationProvider>
    );
}

export default CreateActivityPage;
