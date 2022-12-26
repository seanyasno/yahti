import React from 'react';

import Image, { ImageProps } from 'next/image';

import { StorageReference } from '@firebase/storage';
import { clone } from 'lodash';
import { useDownloadURL } from 'react-firebase-hooks/storage';

type Props = Partial<ImageProps> & {
    imageRef: StorageReference;
};

const ImageWrapper: React.FC<Props> = (props) => {
    const { imageRef } = props;
    const [downloadUrl, loading, error] = useDownloadURL(imageRef);

    const imageProps = clone(props);
    delete imageProps.imageRef;

    return (
        <React.Fragment>
            {!loading && !error && <Image src={downloadUrl} {...imageProps} />}
        </React.Fragment>
    );
};

const MemoizedImageWrapper = React.memo(ImageWrapper);

export { MemoizedImageWrapper as ImageWrapper };
