import React, {useEffect, useState} from 'react';
import {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import {Activity} from '@abstraction/index';
import {doc, getDoc, setDoc} from '@firebase/firestore';
import {auth, db, storage} from '@config/index';
import {Divider, IconButton, Stack, Typography} from '@mui/material';
import {emojiByActivityType} from '@constants/index';
import {openUrlInNewTab} from '@utils/index';
import {IoIosArrowBack} from 'react-icons/io';
import {IoCheckmarkDoneCircleOutline, IoCheckmarkDoneCircleSharp} from 'react-icons/io5';
import {useRouter} from 'next/router';
import {getDownloadURL, ref} from '@firebase/storage';
import Image from 'next/image';
import {useAuthState} from 'react-firebase-hooks/auth';
import {
    DoneButton,
    StyledBackButton,
    UrlButton,
    StyledActivityType,
    StyledContainer,
    ImageContainer,
    Card
} from '@styles/activity-page/activity-page-styles';
import {StyledIconButton} from '@styles/create-activity/create-activity-styles';
import {GrEdit} from 'react-icons/gr';
import {useMutation} from '@tanstack/react-query';
import {LoadingScreen} from '@components/loading-screen/loading-screen';
import {MdDeleteForever} from 'react-icons/md';
import {DeleteActivityDialog} from '@components/delete-activity-dialog/delete-activity-dialog';

type Props = {
    activity: Activity;
    id: string;
    imagesUrls: string[];
}

export const ActivityPage: NextPage<Props> = (props) => {
    const {id, imagesUrls} = props;
    let {activity} = props;
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const {mutateAsync: toggleActivity} = useMutation({
        mutationFn: async () => {
            await setDoc(doc(db, 'activities', id), {
                done: !activity.done,
            }, {merge: true});
            activity.done = !activity.done;
        }
    });

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/login');
        }
    }, [loading, router, user]);

    if (!activity) {
        return <LoadingScreen/>;
    }

    const {title, link, type, done, description} = activity;

    const doneButtonTitle = 'יאללה נסמן שעשינו?';
    const linkTitle = 'קישור לאתר';
    const descriptionTitle = 'קצת תיאור על ההרפתקה שלנו';

    return (
        <StyledContainer maxWidth={'sm'}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={'16px'}>
                <StyledBackButton
                    color={'secondary'}
                    onClick={() => router.push('/')}
                    sx={{}}>
                    <IoIosArrowBack size={20}/>
                </StyledBackButton>

                <Stack direction={'row'} alignItems={'center'} columnGap={'8px'}>
                    <StyledBackButton onClick={() => setOpenDeleteDialog(true)}>
                        <MdDeleteForever color={'#EF233B'} size={20} style={{transform: 'rotate(180deg)'}}/>
                    </StyledBackButton>
                    <StyledBackButton>
                        <GrEdit size={20} style={{transform: 'rotate(180deg)'}}/>
                    </StyledBackButton>
                </Stack>
            </Stack>

            <Card>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'start'}>
                    <Typography fontWeight={700} variant={'h5'}>
                        <IconButton
                            onClick={() => toggleActivity()}
                            sx={{
                                padding: 0,
                                color: done ? '#2a9d8f' : '',
                            }}>
                            {
                                done ?
                                    <IoCheckmarkDoneCircleSharp size={'48px'}/> :
                                    <IoCheckmarkDoneCircleOutline size={'48px'}/>
                            }
                        </IconButton>
                        {'  '}
                        {title}
                    </Typography>


                </Stack>

                {imagesUrls && imagesUrls.length > 0 && (
                    <ImageContainer>
                        <Image
                            alt={'activity image'}
                            src={imagesUrls[0]}
                            layout={'fill'}
                            objectFit={'cover'}
                            priority
                            style={{borderRadius: '1em'}}
                        />

                    </ImageContainer>
                )}

                <Stack direction={'row'} spacing={1} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction={'row'} spacing={0.5} alignItems={'center'}>
                        {link && (
                            <React.Fragment>
                                <Typography variant={'body2'}>{linkTitle}</Typography>
                                <UrlButton
                                    variant={'text'}
                                    color={'secondary'}
                                    onClick={() => openUrlInNewTab(link)}>
                                    {link}
                                </UrlButton>
                            </React.Fragment>
                        )}
                    </Stack>

                    <StyledActivityType>
                        {emojiByActivityType[type]}
                    </StyledActivityType>
                </Stack>
                {description && (
                    <React.Fragment>
                        <Divider sx={{margin: '10px 0'}}/>

                        <Typography variant={'subtitle1'} fontWeight={600}>{descriptionTitle}</Typography>
                        <Typography variant={'body2'}>{description}</Typography>
                    </React.Fragment>
                )}
            </Card>

            {!done && (
                <DoneButton
                    variant={'contained'}
                    color={'secondary'}
                    onClick={() => toggleActivity()}>
                    {doneButtonTitle}
                </DoneButton>
            )}

            <DeleteActivityDialog
                open={openDeleteDialog}
                activity={activity}
                activityId={id}
                onClose={() => setOpenDeleteDialog(false)}
            />
        </StyledContainer>
    );
};

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps = async ({params}) => {
    try {
        const activityId = params.activityId as string;

        const docRef = doc(db, 'activities', activityId);
        const docSnap = await getDoc(docRef);

        const activity: Activity = docSnap.data() as Activity;
        const imagesUrls: string[] = [];

        if (activity.imagesPaths) {
            for (let imagePath of activity.imagesPaths) {
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
