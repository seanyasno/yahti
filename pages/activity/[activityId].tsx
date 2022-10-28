import React, {useEffect} from 'react';
import {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import {Activity} from '@abstraction/index';
import {doc, getDoc} from '@firebase/firestore';
import {auth, db, storage} from '@config/index';
import styled from '@emotion/styled';
import {Box, Button, Container, Divider, IconButton, Stack, Typography} from '@mui/material';
import {ActivityType, BackButton} from '@styles/index';
import {emojiByActivityType} from '@constants/index';
import {openUrlInNewTab} from '@utils/index';
import {IoIosArrowBack} from 'react-icons/io';
import {IoCheckmarkDoneCircleOutline, IoCheckmarkDoneCircleSharp} from 'react-icons/io5';
import {useRouter} from 'next/router';
import {getDownloadURL, ref} from '@firebase/storage';
import Image from 'next/image';
import {useAuthState} from 'react-firebase-hooks/auth';

export const Card = styled.div`
  background-color: #fff;
  padding: 26px 20px;
  border-radius: 1em;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin-bottom: 20px;
`;

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
        <Container
            maxWidth={'sm'}
            sx={{
                height: '-webkit-fill-available',
                display: 'flex',
                flexDirection: 'column',
                padding: '20px 20px 0 20px',
            }}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={'16px'}>
                <BackButton
                    color={'secondary'}
                    onClick={() => router.push('/')}
                    sx={{maxWidth: 'fit-content', marginBottom: '0 !important'}}>
                    <IoIosArrowBack size={20}/>
                </BackButton>

                <IconButton sx={{
                    padding: 0,
                    color: done ? '#2a9d8f' : '',
                }}>
                    {
                        done ?
                            <IoCheckmarkDoneCircleSharp size={'40px'}/> :
                            <IoCheckmarkDoneCircleOutline size={'40px'}/>
                    }
                </IconButton>
            </Stack>


            <Card>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography fontWeight={700} variant={'h5'}>{title}</Typography>
                    <ActivityType
                        sx={{
                            width: '40px !important',
                            height: '40px !important',
                            fontSize: '22px !important',
                        }}>
                        {emojiByActivityType[type]}
                    </ActivityType>
                </Stack>

                {props.imagesUrls && props.imagesUrls.length > 0 && (
                    <Box sx={{
                        minHeight: '300px',
                        display: 'flex',
                        position: 'relative',
                        margin: '16px 0',
                    }}>
                        <Image
                            alt={'activity image'}
                            src={props.imagesUrls[0]}
                            layout={'fill'}
                            objectFit={'cover'}
                            style={{
                                borderRadius: '1em',
                            }}
                        />

                    </Box>
                )}

                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                    <Typography variant={'body2'}>{link ? linkTitle : noLinkTitle}</Typography>
                    <Button
                        variant={'text'}
                        color={'secondary'}
                        onClick={() => openUrlInNewTab(link)}
                        sx={{
                            padding: 0,
                            fontWeight: 300,
                        }}>
                        {link}
                    </Button>
                </Stack>

                <Divider sx={{margin: '10px 0'}}/>

                <Typography variant={'subtitle1'} fontWeight={600}>{descriptionTitle}</Typography>
                <Typography variant={'body2'}>{description}</Typography>
            </Card>

            {/*<Button*/}
            {/*    variant={'contained'}*/}
            {/*    color={'secondary'}*/}
            {/*    sx={{*/}
            {/*        padding: '12px 80px',*/}
            {/*        fontSize: '1.2rem',*/}
            {/*        borderRadius: '1em',*/}
            {/*        width: '100%',*/}
            {/*        marginTop: 'auto',*/}
            {/*    }}*/}
            {/*    {doneButtonTitle}*/}
            {/*</Button>*/}
        </Container>
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
