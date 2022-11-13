import React, { useEffect, useRef } from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { auth } from '@config/index';
import styled from '@emotion/styled';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';

const CenteredStack = styled(Stack)`
    height: -webkit-fill-available;
    margin: 0 20px;
`;

const LoginPage: NextPage = () => {
    const router = useRouter();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [user, loading] = useAuthState(auth);

    const title = 'יאללה להתחבר';
    const buttonLabel = 'התחבר';

    const onLogin = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                emailRef.current?.value,
                passwordRef.current?.value
            );
            if (user) {
                router.push('/');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!loading && user) {
            router.replace('/');
        }
    }, [loading, user]);

    return (
        <CenteredStack maxWidth={'sm'} justifyContent={'center'} spacing={2}>
            <Typography fontWeight={200} variant={'h4'}>
                {title}
            </Typography>
            <TextField
                inputRef={emailRef}
                placeholder={'Email'}
                inputProps={{
                    style: {
                        direction: 'ltr',
                    },
                }}
                type={'email'}
            />
            <TextField
                inputRef={passwordRef}
                placeholder={'Password'}
                inputProps={{
                    style: {
                        direction: 'ltr',
                    },
                }}
                type={'password'}
            />
            <Button variant={'contained'} color={'secondary'} onClick={onLogin}>
                {buttonLabel}
            </Button>
        </CenteredStack>
    );
};

export default LoginPage;
