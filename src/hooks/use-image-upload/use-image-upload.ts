import { ChangeEvent, useState } from 'react';

import { parseImageToString } from '@utils/index';

export const useImageUpload = (initialParsedImage?: string) => {
    const [isImageChanged, setIsImageChanged] = useState(false);
    const [imageFile, setImageFile] = useState<File>();
    const [parsedImage, setParsedImage] = useState<string | null>(
        initialParsedImage
    );

    const onFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event) {
            setImageFile(undefined);
            setParsedImage(undefined);
            return;
        }

        if (!event.target.files) {
            return;
        }

        try {
            const file = event.target.files[0];
            setImageFile(file);
            setParsedImage(await parseImageToString(file));
            setIsImageChanged(true);
        } catch (error) {
            console.error(error);
        }
    };

    return {
        imageFile,
        parsedImage,
        isImageChanged,
        onFileUpload,
    };
};
