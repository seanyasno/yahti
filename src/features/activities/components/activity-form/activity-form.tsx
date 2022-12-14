import React, { ChangeEvent, useState } from 'react';

import Image from 'next/image';

import { Box, Input, InputAdornment, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import ScaleLoader from 'react-spinners/ScaleLoader';

import { Activity } from '@abstraction/types';
import { useActivityForm } from '@features/activities';
import { parseImageToString } from '@utils/index';

import {
    CreateButton,
    CreateButtonContainer,
    StyledDivider,
    UploadPhotoButton,
    UploadPhotoContainer,
} from './styles';

type Props = {
    initialActivity?: Activity;
    imagesUrls?: string[];
    onDone?: (
        newActivity: Partial<Activity>,
        imageFiles?: File[]
    ) => Promise<void>;
    setChangedImage?: (changedImages: boolean) => void;
};

export const ActivityForm: React.FC<Props> = (props) => {
    const { initialActivity, imagesUrls, onDone, setChangedImage } = props;
    const { activity, handleActivityChange } = useActivityForm(initialActivity);
    const { mutateAsync: handleOnDone, isLoading } = useMutation({
        mutationFn: async () => onDone(activity, [imageFile]),
    });

    const [imageFile, setImageFile] = useState<File>();
    const [parsedImage, setParsedImage] = useState<string | null>(
        imagesUrls?.[0]
    );

    const titlePlaceholder = 'כותרת גדולה';
    const titleInputAdornment = 'קדימה לכתוב:';
    const createButtonTitle = 'יאללה נוסיף';
    const addPhotoTitle = 'מה עם תמונה יפה לאוסף?';
    const addPhotoButtonTitle = 'קדימה ללחוץ עלי';
    const linkInputPlaceholder = 'קישור לאיזה אתר או משהו אחר';
    const descriptionInputPlaceholder = 'יאחתי אפשר לפרט פה הכל';

    const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            return;
        }

        try {
            const file = event.target.files[0];
            setImageFile(file);
            setParsedImage(await parseImageToString(file));
            setChangedImage?.(true);
        } catch (error) {
            console.error(error);
        }
    };

    const componentProps = { component: 'label' };

    return (
        <React.Fragment>
            <Typography variant={'h4'} fontWeight={600} mb={'16px'}>
                {isEmpty(activity.title) ? titlePlaceholder : activity.title}
            </Typography>

            <Input
                name={'title'}
                value={activity.title}
                onChange={handleActivityChange}
                disabled={isLoading}
                multiline
                startAdornment={
                    <InputAdornment position={'start'} sx={{}}>
                        <Typography>{titleInputAdornment}</Typography>
                    </InputAdornment>
                }
            />

            <StyledDivider />

            <UploadPhotoContainer>
                <Typography>{addPhotoTitle}</Typography>
                <UploadPhotoButton
                    {...componentProps}
                    variant={'text'}
                    color={'secondary'}
                >
                    {addPhotoButtonTitle}
                    <input
                        type="file"
                        accept="image/png,image/jpeg"
                        hidden
                        disabled={isLoading}
                        onChange={handleFileUpload}
                    />
                </UploadPhotoButton>
            </UploadPhotoContainer>

            {parsedImage && (
                <Box
                    sx={{
                        minHeight: '300px',
                        display: 'flex',
                        position: 'relative',
                    }}
                >
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

            <StyledDivider />

            <Input
                name={'link'}
                value={activity.link}
                onChange={handleActivityChange}
                disabled={isLoading}
                inputMode={'url'}
                type={'url'}
                placeholder={linkInputPlaceholder}
                multiline
            />

            <StyledDivider />

            <Input
                name={'description'}
                value={activity.description}
                onChange={handleActivityChange}
                disabled={isLoading}
                placeholder={descriptionInputPlaceholder}
                multiline
            />

            <CreateButtonContainer>
                <CreateButton
                    variant={'contained'}
                    color={'secondary'}
                    disabled={isLoading}
                    onClick={() => handleOnDone()}
                >
                    {isLoading ? (
                        <ScaleLoader color={'#fff'} />
                    ) : (
                        createButtonTitle
                    )}
                </CreateButton>
            </CreateButtonContainer>
        </React.Fragment>
    );
};
