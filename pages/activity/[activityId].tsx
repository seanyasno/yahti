import React, { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Activity } from '@abstraction/index';
import { auth, storage } from '@config/index';
import {
    Dialog,
    DialogContent,
    Divider,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';
import { emojiByActivityType } from '@constants/index';
import { openUrlInNewTab } from '@utils/index';
import { IoIosArrowBack } from 'react-icons/io';
import {
    IoCheckmarkDoneCircleOutline,
    IoCheckmarkDoneCircleSharp,
} from 'react-icons/io5';
import { useRouter } from 'next/router';
import { getDownloadURL, ref } from '@firebase/storage';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
    DoneButton,
    StyledBackButton,
    StyledActivityType,
    StyledContainer,
    ImageContainer,
    Card,
} from '@styles/activity-page/activity-page-styles';
import { GrEdit } from 'react-icons/gr';
import { useMutation } from '@tanstack/react-query';
import { LoadingScreen, DeleteActivityDialog } from '@components/index';
import { MdDeleteForever } from 'react-icons/md';
import { GoLinkExternal } from 'react-icons/go';
import {
    fetchActivityById,
    updateActivity,
} from '@requests/firestore-requests/firestore-requests';

type Props = {
    activity: Activity;
    id: string;
    imagesUrls: string[];
};

export const ActivityPage: NextPage<Props> = (props) => {
    const { id, imagesUrls } = props;
    const { activity } = props;
    const router = useRouter();
    const [openFullImageDialog, setOpenFullImageDialog] = useState(false);
    const [user, loading] = useAuthState(auth);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const { mutateAsync: toggleActivity } = useMutation({
        mutationFn: async () => updateActivity(id, { done: !activity.done }),
        onSuccess: () => (activity.done = !activity.done),
    });

    const onEdit = () => router.push(`/edit-activity/${id}`);

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/login');
        }
    }, [loading, router, user]);

    if (!activity) {
        return <LoadingScreen />;
    }

    const { title, link, types, done, description } = activity;

    const doneButtonTitle = 'יאללה נסמן שעשינו?';
    const linkTitle = 'קישור לאתר';
    const descriptionTitle = 'קצת תיאור על ההרפתקה שלנו';

    return (
        <StyledContainer maxWidth={'sm'}>
            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                mb={'16px'}
            >
                <StyledBackButton
                    color={'secondary'}
                    onClick={() => router.push('/')}
                    sx={{}}
                >
                    <IoIosArrowBack size={20} />
                </StyledBackButton>

                <Stack
                    direction={'row'}
                    alignItems={'center'}
                    columnGap={'8px'}
                >
                    <StyledBackButton onClick={() => setOpenDeleteDialog(true)}>
                        <MdDeleteForever
                            color={'#EF233B'}
                            size={20}
                            style={{ transform: 'rotate(180deg)' }}
                        />
                    </StyledBackButton>
                    <StyledBackButton onClick={onEdit}>
                        <GrEdit
                            size={20}
                            style={{ transform: 'rotate(180deg)' }}
                        />
                    </StyledBackButton>
                </Stack>
            </Stack>

            <Card>
                <Stack
                    direction={'row'}
                    justifyContent={'space-between'}
                    alignItems={'start'}
                >
                    <Typography fontWeight={700} variant={'h5'}>
                        <IconButton
                            onClick={() => toggleActivity()}
                            sx={{
                                padding: 0,
                                color: done ? '#2a9d8f' : '',
                            }}
                        >
                            {done ? (
                                <IoCheckmarkDoneCircleSharp size={'48px'} />
                            ) : (
                                <IoCheckmarkDoneCircleOutline size={'48px'} />
                            )}
                        </IconButton>
                        {'  '}
                        {title}
                    </Typography>
                </Stack>

                {imagesUrls && imagesUrls.length > 0 && (
                    <ImageContainer
                        onClick={() => setOpenFullImageDialog(true)}
                    >
                        <Image
                            alt={'activity image'}
                            src={imagesUrls[0]}
                            layout={'fill'}
                            objectFit={'cover'}
                            priority
                            style={{ borderRadius: '1em' }}
                        />
                    </ImageContainer>
                )}

                <Stack
                    direction={'row'}
                    spacing={1}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    {link && (
                        <Stack
                            direction={'row'}
                            spacing={0.5}
                            alignItems={'center'}
                        >
                            <Typography variant={'body2'}>
                                {linkTitle}
                            </Typography>
                            <IconButton
                                sx={{ padding: 0 }}
                                onClick={() => openUrlInNewTab(activity.link)}
                            >
                                <GoLinkExternal size={'20px'} />
                            </IconButton>
                        </Stack>
                    )}

                    <Stack
                        direction={'row'}
                        width={'100%'}
                        justifyContent={'flex-end'}
                        spacing={2}
                    >
                        {types?.map((type, index) => (
                            <StyledActivityType key={index}>
                                {emojiByActivityType[type]}
                            </StyledActivityType>
                        ))}
                    </Stack>
                </Stack>
                {description && (
                    <React.Fragment>
                        <Divider sx={{ margin: '10px 0' }} />

                        <Typography variant={'subtitle1'} fontWeight={600}>
                            {descriptionTitle}
                        </Typography>
                        <Typography variant={'body2'}>{description}</Typography>
                    </React.Fragment>
                )}
            </Card>

            {!done && (
                <DoneButton
                    variant={'contained'}
                    color={'secondary'}
                    onClick={() => toggleActivity()}
                >
                    {doneButtonTitle}
                </DoneButton>
            )}

            <DeleteActivityDialog
                open={openDeleteDialog}
                activity={activity}
                activityId={id}
                onClose={() => setOpenDeleteDialog(false)}
            />

            <Dialog
                open={openFullImageDialog}
                onClick={() => setOpenFullImageDialog(false)}
                onClose={() => setOpenFullImageDialog(false)}
                fullScreen
                PaperProps={{
                    sx: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    },
                }}
                sx={{
                    padding: '20px',
                }}
            >
                <DialogContent>
                    <Image
                        src={imagesUrls?.[0]}
                        layout={'fill'}
                        objectFit={'contain'}
                        priority
                        alt={''}
                    />
                </DialogContent>
            </Dialog>
        </StyledContainer>
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

export default ActivityPage;
