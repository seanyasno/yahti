import React from 'react';

import Image, { ImageProps } from 'next/image';

import { storage } from '@config/index';
import { ref } from '@firebase/storage';
import { clone } from 'lodash';
import { useDownloadURL } from 'react-firebase-hooks/storage';

type Props = Partial<ImageProps> & {
    imageUrl: string;
};

const ImageWrapper: React.FC<Props> = (props) => {
    const { imageUrl } = props;
    const [downloadUrl, loading, error] = useDownloadURL(
        ref(storage, imageUrl)
    );

    const imageProps = clone(props);
    delete imageProps.imageUrl;

    return (
        <React.Fragment>
            {!loading && !error && <Image src={downloadUrl} {...imageProps} />}
        </React.Fragment>
    );
};

const MemoizedImageWrapper = React.memo(ImageWrapper);

export { MemoizedImageWrapper as ImageWrapper };
