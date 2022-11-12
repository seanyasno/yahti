import React, { useCallback, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { ActivitySelection, ActivityForm } from '@components/index';
import { IoIosArrowBack } from 'react-icons/io';
import {
    Container,
    StyledIconButton,
} from '@styles/create-activity/create-activity-styles';
import { useRouter } from 'next/router';
import { ActivityCreationProvider } from '@contexts/index';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@config/index';

const CreateActivityPage: NextPage = () => {
    const router = useRouter();
    const pages = [
        <ActivitySelection
            key={'selection'}
            next={() => setCurrentPage((currentPage) => currentPage + 1)}
        />,
        <ActivityForm key={'form'} />,
    ];
    const [currentPage, setCurrentPage] = useState(0);
    const [user, loading] = useAuthState(auth);

    const onBack = useCallback(async () => {
        if (currentPage === 0) {
            await router.replace('/');
        } else {
            setCurrentPage((currentPage) => currentPage - 1);
        }
    }, [currentPage, router]);

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/login');
        }
    }, [loading, router, user]);

    return (
        <ActivityCreationProvider>
            <Container>
                <StyledIconButton color={'secondary'} onClick={onBack}>
                    <IoIosArrowBack size={20} />
                </StyledIconButton>

                {pages[currentPage]}
            </Container>
        </ActivityCreationProvider>
    );
};

export default CreateActivityPage;
