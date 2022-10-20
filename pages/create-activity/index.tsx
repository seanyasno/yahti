import React, {useCallback, useState} from 'react';
import {NextPage} from 'next';
import {ActivitySelection, ActivityForm} from '@components/index';
import {IoIosArrowBack} from 'react-icons/io';
import {Container, BackButton} from '@styles/create-activity/create-activity-styles';
import {useRouter} from 'next/router';
import {ActivityCreationProvider} from '@contexts/index';


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
            <Container>
                <BackButton color={'secondary'} onClick={onBack}>
                    <IoIosArrowBack size={20}/>
                </BackButton>

                {pages[currentPage]}
            </Container>
        </ActivityCreationProvider>
    );
}

export default CreateActivityPage;
