import {
    UploadPhotoContainer,
    UploadPhotoButton,
    CreateButton,
    CreateButtonContainer,
    StyledDivider,
} from './styles';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { Box, Input, InputAdornment, Typography } from '@mui/material';
import { parseImageToString } from '@utils/index';
import Image from 'next/image';
import { isEmpty } from 'lodash';
import { Activity } from '@abstraction/types';
import { useActivityForm } from '@hooks/use-activity-form/use-activity-form';

type Props = {
    initialActivity?: Activity;
    imagesUrls?: string[];
    onDone?: (newActivity: Partial<Activity>, imageFiles?: File[]) => void;
    setChangedImage?: (changedImages: boolean) => void;
};

export const ActivityForm: React.FC<Props> = (props) => {
    const { initialActivity, imagesUrls, onDone, setChangedImage } = props;
    const { activity, handleActivityChange } = useActivityForm(initialActivity);

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

    const handleOnDone = useCallback(() => {
        onDone?.(activity, [imageFile]);
    }, [activity, imageFile, onDone]);

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
                placeholder={descriptionInputPlaceholder}
                multiline
            />

            <CreateButtonContainer>
                <CreateButton
                    variant={'contained'}
                    color={'secondary'}
                    onClick={handleOnDone}
                >
                    {/*{create ? (*/}
                    {/*    <ScaleLoader color={'#fff'} />*/}
                    {/*) : (*/}
                    {createButtonTitle}
                    {/*)}*/}
                </CreateButton>
            </CreateButtonContainer>
        </React.Fragment>
    );
};
