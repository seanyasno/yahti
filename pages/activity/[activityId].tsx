import React, {useEffect} from 'react';
import {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import {Activity} from '@abstraction/index';
import {doc, getDoc} from '@firebase/firestore';
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

type Props = {
    activity: Activity;
    id: string;
    imagesUrls: string[];
}

export const ActivityPage: NextPage<Props> = (props) => {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/login');
        }
    }, [loading, router, user]);

    if (!props.activity) {
        return <div>loading...</div>;
    }

    const {title, link, type, done, description} = props.activity;

    const doneButtonTitle = 'יאללה נסמן שעשינו?';
    const linkTitle = 'קישור לאתר';
    const noLinkTitle = 'כפרה עליך אין כאן קישור';
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

                <StyledBackButton>
                    <GrEdit size={20} style={{transform: 'rotate(180deg)'}}/>
                </StyledBackButton>
            </Stack>

            <Card>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'start'}>
                    <Typography fontWeight={700} variant={'h5'}>
                        <IconButton sx={{
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

                {props.imagesUrls && props.imagesUrls.length > 0 && (
                    <ImageContainer>
                        <Image
                            alt={'activity image'}
                            src={props.imagesUrls[0]}
                            layout={'fill'}
                            objectFit={'cover'}
                            priority
                            style={{borderRadius: '1em'}}
                        />

                    </ImageContainer>
                )}

                <Stack direction={'row'} spacing={1} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction={'row'} spacing={0.5} alignItems={'center'}>
                        <Typography variant={'body2'}>{link ? linkTitle : noLinkTitle}</Typography>
                        <UrlButton
                            variant={'text'}
                            color={'secondary'}
                            onClick={() => openUrlInNewTab(link)}>
                            {link}
                        </UrlButton>
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

            <DoneButton
                variant={'contained'}
                color={'secondary'}>
                {doneButtonTitle}
            </DoneButton>
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
