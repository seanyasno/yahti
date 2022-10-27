import React, {useEffect} from 'react';
import {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import {Activity} from '@abstraction/index';
import {doc, getDoc} from '@firebase/firestore';
import {db} from '@config/index';
import styled from '@emotion/styled';
import {Button, Container, Divider, IconButton, Stack, Typography} from '@mui/material';
import {ActivityType, BackButton} from '@styles/index';
import {emojiByActivityType} from '@constants/index';
import {openUrlInNewTab} from '@utils/index';
import {IoIosArrowBack} from 'react-icons/io';
import {IoCheckmarkDoneCircleOutline, IoCheckmarkDoneCircleSharp} from 'react-icons/io5';
import {useRouter} from 'next/router';

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
}

export const ActivityPage: NextPage<Props> = (props) => {
    const router = useRouter();

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

                {/*<Box sx={{*/}
                {/*    minHeight: '250px',*/}
                {/*    width: '100%',*/}
                {/*    backgroundColor: '#0A99EA',*/}
                {/*    borderRadius: '1em',*/}
                {/*    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px',*/}
                {/*    marginTop: '10px',*/}
                {/*}}/>*/}

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

        return {
            props: {
                activity: docSnap.data(),
                id: activityId,
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
