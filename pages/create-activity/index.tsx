import React, { useCallback, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { ActivitySelection, ActivityForm } from '@components/index';
import { IoIosArrowBack } from 'react-icons/io';
import { Container, StyledIconButton } from '@styles/index';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, storage } from '@config/index';
import { useActivityForm } from '@hooks/index';
import { ref, uploadBytes } from '@firebase/storage';
import { v4 } from 'uuid';
import { createActivity } from '@requests/index';
import { Activity } from '@abstraction/types';

const CreateActivityPage: NextPage = () => {
    const router = useRouter();
    const { activity, setActivity } = useActivityForm();
    const [currentPage, setCurrentPage] = useState(0);
    const [user, loading] = useAuthState(auth);

    const onBack = useCallback(async () => {
        if (currentPage === 0) {
            await router.replace('/');
        } else {
            setCurrentPage((currentPage) => currentPage - 1);
        }
    }, [currentPage, router]);

    const onCreate = useCallback(
        async (activity: Activity, imageFiles?: File[]) => {
            try {
                const imagesPaths: string[] = [];

                for (const image of imageFiles.filter((file) => file)) {
                    const imageRef = ref(
                        storage,
                        `images/${v4()}---${image.name}`
                    );
                    const snapshot = await uploadBytes(imageRef, image);
                    imagesPaths.push(snapshot.ref.fullPath);
                }

                await createActivity({ ...activity, imagesPaths });
                router.replace('/');
            } catch (error) {
                console.error(error);
            }
        },
        [router]
    );

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/login');
        }
    }, [loading, router, user]);

    const pages = [
        <ActivitySelection
            key={'selection'}
            initialSelectedTypes={activity?.types}
            onDone={(selectedTypes) => {
                setActivity({ types: selectedTypes });
                setCurrentPage((currentPage) => currentPage + 1);
            }}
        />,
        <ActivityForm
            key={'form'}
            initialActivity={activity}
            onDone={onCreate}
        />,
    ];

    return (
        <Container>
            <StyledIconButton color={'secondary'} onClick={onBack}>
                <IoIosArrowBack size={20} />
            </StyledIconButton>

            {pages[currentPage]}
        </Container>
    );
};

export default CreateActivityPage;
