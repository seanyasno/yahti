import {UploadPhotoContainer, UploadPhotoButton, CreateButton, CreateButtonContainer, StyledDivider} from './styles';
import React, {ChangeEvent, useCallback, useContext, useEffect, useRef, useState} from 'react';
import {Box, Input, InputAdornment, Typography} from '@mui/material';
import {ActivityCreationContext} from '@contexts/index';
import {parseImageToString} from '@utils/index';
import {useRouter} from 'next/router';
import Image from 'next/image';

export const ActivityForm = () => {
    const router = useRouter();
    const {setActivity, onSuccess} = useContext(ActivityCreationContext);
    const [title, setTitle] = useState('');
    const [create, setCreate] = useState(false);
    const [imageFile, setImageFile] = useState<File>();
    const [parsedImage, setParsedImage] = useState<string | null>(null);
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
            images: imageFile ? [imageFile] : [],
        });
        setCreate(true);
    }, [imageFile, setActivity, title]);

    const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            return;
        }

        try {
            const file = event.target.files[0];
            setImageFile(file);
            setParsedImage(await parseImageToString(file));
        } catch (error) {
            console.error(error);
        }
    };

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

    const props = {component: 'label'};

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
                <UploadPhotoButton {...props} variant={'text'} color={'secondary'}>
                    {addPhotoButtonTitle}
                    <input
                        type="file"
                        accept="image/png,image/jpeg"
                        hidden
                        onChange={handleFileUpload}
                    />
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

            {parsedImage && (
                <Box sx={{
                    minHeight: '300px',
                    display: 'flex',
                    position: 'relative',
                }}>
                    <Image
                        alt={'activity image'}
                        src={parsedImage}
                        layout={'fill'}
                        objectFit={'cover'}
                        style={{
                            borderRadius: '1em',
                        }}
                    />

                </Box>
            )}

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
