import React, { useCallback, useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { fetchActivityById, updateActivity } from '@requests/index';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { auth, storage } from '@config/index';
import { Activity } from '@abstraction/types';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { Container, StyledIconButton } from '@styles/index';
import { IoIosArrowBack } from 'react-icons/io';
import {
    LoadingScreen,
    ActivityForm,
    ActivitySelection,
} from '@components/index';
import { useActivityForm } from '@hooks/index';
import { v4 } from 'uuid';

type Props = {
    activity: Activity;
    id: string;
    imagesUrls: string[];
};

const EditActivityPage: NextPage<Props> = (props) => {
    const { activity: initialActivity, id, imagesUrls } = props;
    const router = useRouter();
    const { activity, setActivity } = useActivityForm(initialActivity);
    const [currentPage, setCurrentPage] = useState(0);
    const [user, loading] = useAuthState(auth);
    const [changedImage, setChangedImage] = useState(false);

    const onBack = useCallback(async () => {
        if (currentPage === 0) {
            await router.replace('/');
        } else {
            setCurrentPage((currentPage) => currentPage - 1);
        }
    }, [currentPage, router]);

    const onUpdate = useCallback(
        async (newActivity: Partial<Activity>, imageFiles?: File[]) => {
            try {
                const imagesPaths: string[] = [];
                if (changedImage) {
                    for (const image of imageFiles.filter((file) => file)) {
                        const imageRef = ref(
                            storage,
                            `images/${v4()}---${image.name}`
                        );
                        const snapshot = await uploadBytes(imageRef, image);
                        imagesPaths.push(snapshot.ref.fullPath);
                    }
                } else {
                    imagesPaths.push(...activity.imagesPaths);
                }

                await updateActivity(id, { ...newActivity, imagesPaths });
                await router.replace(`/activity/${id}`);
            } catch (error) {
                console.error(error);
            }
        },
        [id, router, changedImage, activity]
    );

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/login');
        }
    }, [loading, router, user]);

    if (!props.activity || !id) {
        return <LoadingScreen />;
    }

    const pages = [
        <ActivitySelection
            key={'selection'}
            initialSelectedTypes={activity.types}
            onDone={(selectedTypes) => {
                setActivity({ types: selectedTypes });
                setCurrentPage((currentPage) => currentPage + 1);
            }}
        />,
        <ActivityForm
            key={'form'}
            initialActivity={activity}
            imagesUrls={imagesUrls}
            onDone={onUpdate}
            setChangedImage={setChangedImage}
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

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const activityId = params.activityId as string;

        const activity = await fetchActivityById(activityId);
        const imagesUrls: string[] = [];

        if (activity.imagesPaths) {
            for (const imagePath of activity.imagesPaths) {
                const url = await getDownloadURL(ref(storage, imagePath));
                imagesUrls.push(url);
            }
        }

        return {
            props: {
                activity,
                id: activityId,
                imagesUrls,
            },
            revalidate: 1,
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                activity: null,
            },
        };
    }
};

export default EditActivityPage;
