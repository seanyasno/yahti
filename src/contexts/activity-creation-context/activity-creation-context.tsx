import React, {
    createContext,
    PropsWithChildren,
    useCallback,
    useReducer,
} from 'react';

import { storage } from '@config/index';
import { ref, uploadBytes } from '@firebase/storage';
import { isEmpty } from 'lodash';
import { v4 } from 'uuid';

import { Activity } from '@abstraction/index';
import { createActivity } from '@requests/index';

type ContextType = {
    activity: Activity;
    imagesUrls?: string[];
    setActivity: (activity: Partial<Activity>) => void;
    onSuccess: (imageFiles?: File[]) => Promise<void>;
};

export const ActivityCreationContext = createContext<ContextType>(null);

type Props = {
    initialActivity?: Partial<Activity>;
    imagesUrls?: string[];
};

export const ActivityCreationProvider: React.FC<PropsWithChildren<Props>> = (
    props
) => {
    const { children, initialActivity } = props;
    const [activity, setActivity] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        initialActivity
    );

    const onSuccess = useCallback(
        async (imageFiles?: File[]) => {
            try {
                const imagesPaths: string[] = [];

                for (const image of imageFiles.filter(
                    (file) => !isEmpty(file)
                )) {
                    const imageRef = ref(
                        storage,
                        `images/${v4()}---${image.name}`
                    );
                    const snapshot = await uploadBytes(imageRef, image);
                    imagesPaths.push(snapshot.ref.fullPath);
                }

                await createActivity({ ...activity, imagesPaths });
            } catch (error) {
                console.error(error);
            }
        },
        [activity]
    );

    return (
        <ActivityCreationContext.Provider
            value={{
                activity,
                imagesUrls: props.imagesUrls,
                setActivity,
                onSuccess,
            }}
        >
            {children}
        </ActivityCreationContext.Provider>
    );
};
