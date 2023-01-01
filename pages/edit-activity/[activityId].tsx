import React, { useCallback, useEffect, useState } from 'react';

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { IoIosArrowBack } from 'react-icons/io';

import { auth, storage } from '@config/index';
import { deleteObject, getDownloadURL, listAll, ref } from '@firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useUploadFile } from 'react-firebase-hooks/storage';

import { Activity } from '@abstraction/types';
import { LoadingScreen } from '@components/index';
import {
    ActivityForm,
    ActivitySelection,
    useActivityForm,
} from '@features/activities';
import { fetchActivityById, updateActivity } from '@requests/index';
import { Container, StyledIconButton } from '@styles/index';

type Props = {
    activity: Activity;
    id: string;
    imagesUrls: { url: string; name: string }[];
};

const EditActivityPage: NextPage<Props> = (props) => {
    const { activity: initialActivity, id, imagesUrls } = props;
    const router = useRouter();
    const { activity, setFieldValue } = useActivityForm(initialActivity);
    const [currentPage, setCurrentPage] = useState(0);
    const [user, loading] = useAuthState(auth);
    const [changedImage, setChangedImage] = useState(false);
    const [deletedImage, setDeletedImage] = useState(false);
    const [uploadFile] = useUploadFile();

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
                if (deletedImage) {
                    await deleteObject(
                        ref(storage, `activities/${id}/${imagesUrls[0].name}`)
                    );
                } else if (changedImage) {
                    const filteredFiles = imageFiles.filter((file) => file);
                    for (let index = 0; index < filteredFiles.length; index++) {
                        const imageRef = ref(
                            storage,
                            `activities/${id}/${index}.${filteredFiles[
                                index
                            ].name
                                .split('.')
                                .pop()}`
                        );

                        await uploadFile(imageRef, filteredFiles[index]);
                    }
                }

                await updateActivity(id, newActivity);
                await router.replace(`/activity/${id}`);
            } catch (error) {
                console.error(error);
            }
        },
        [id, router, changedImage, deletedImage, activity]
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
                setFieldValue('types', selectedTypes);
                setCurrentPage((currentPage) => currentPage + 1);
            }}
        />,
        <ActivityForm
            key={'form'}
            initialActivity={activity}
            imagesUrls={imagesUrls.map((image) => image.url)}
            onDone={onUpdate}
            setChangedImage={setChangedImage}
            setDeletedImages={setDeletedImage}
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
        const imagesUrls: { url: string; name: string }[] = [];

        const result = await listAll(ref(storage, `activities/${activityId}`));
        for (const imageReferences of result.items) {
            const url = await getDownloadURL(imageReferences);
            imagesUrls.push({ url, name: imageReferences.name });
        }

        return {
            props: {
                activity,
                id: activityId,
                imagesUrls,
            },
            revalidate: true,
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
