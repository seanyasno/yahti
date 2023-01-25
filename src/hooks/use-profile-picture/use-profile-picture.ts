import { storage } from '@config/index';
import { ref } from '@firebase/storage';
import { useDownloadURL } from 'react-firebase-hooks/storage';

export const useProfilePicture = (uid: string) => {
    const [pictureUrl, isLoadingPicture, error] = useDownloadURL(
        uid && ref(storage, `profile_pictures/${uid}.jpg`)
    );

    return { pictureUrl, isLoadingPicture, error };
};
