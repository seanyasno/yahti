import {UploadPhotoContainer, UploadPhotoButton, CreateButton, CreateButtonContainer, StyledDivider} from './styles';
import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {Input, InputAdornment, Typography} from '@mui/material';
import {ActivityCreationContext} from '@contexts/index';
import {useRouter} from 'next/router';

export const ActivityForm = () => {
    const router = useRouter();
    const {setActivity, onSuccess} = useContext(ActivityCreationContext);
    const [title, setTitle] = useState('');
    const [create, setCreate] = useState(false);
    const linkInputRef = useRef<HTMLInputElement>(null);
    const descriptionInputRef = useRef<HTMLInputElement>(null);

    const titleInputAdornment = 'קדימה לכתוב:';
    const createButtonTitle = 'יאללה נוסיף';
    const addPhotoTitle = 'מה עם תמונה יפה לאוסף?';
    const addPhotoButtonTitle = 'קדימה ללחוץ עלי';
    const linkInputPlaceholder = 'קישור לאיזה אתר או משהו אחר';
    const descriptionInputPlaceholder = 'יאחתי אפשר לפרט פה הכל';

    useEffect(() => {
        if (!title) {
            setTitle('כותרת גדולה');
        }
    }, [title]);

    const onCreate = useCallback(async () => {
        setActivity({
            title,
            link: linkInputRef.current?.value,
            description: descriptionInputRef.current?.value,
            done: false,
        });
        setCreate(true);
    }, [setActivity, title, onSuccess]);

    useEffect(() => {
        (async () => {
            if (create) {
                await onSuccess();
                router.replace('/');
            }
        })();

        return () => {
            setCreate(false);
        };
    }, [create, onSuccess, router, setCreate]);

    return (
        <React.Fragment>
            <Typography variant={'h4'} fontWeight={600} mb={'16px'}>{title}</Typography>

            <Input
                startAdornment={
                    <InputAdornment position={'start'} sx={{}}>
                        <Typography>{titleInputAdornment}</Typography>
                    </InputAdornment>
                }
                multiline
                onChange={event => setTitle(event.target.value)}/>

            <StyledDivider/>

            <UploadPhotoContainer>
                <Typography>{addPhotoTitle}</Typography>
                <UploadPhotoButton variant={'text'} color={'secondary'}>
                    {addPhotoButtonTitle}
                </UploadPhotoButton>
            </UploadPhotoContainer>

            {/*<Box sx={{*/}
            {/*    minHeight: '250px',*/}
            {/*    width: '100%',*/}
            {/*    backgroundColor: '#0A99EA',*/}
            {/*    borderRadius: '1em',*/}
            {/*    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px',*/}
            {/*    marginTop: '10px',*/}
            {/*}}/>*/}

            <StyledDivider/>

            <Input
                inputRef={linkInputRef}
                inputMode={'url'}
                type={'url'}
                placeholder={linkInputPlaceholder}
                multiline/>

            <StyledDivider/>

            <Input
                inputRef={descriptionInputRef}
                placeholder={descriptionInputPlaceholder}
                multiline/>

            <CreateButtonContainer>
                <CreateButton
                    variant={'contained'}
                    color={'secondary'}
                    onClick={onCreate}>
                    {createButtonTitle}
                </CreateButton>
            </CreateButtonContainer>
        </React.Fragment>
    );
};
