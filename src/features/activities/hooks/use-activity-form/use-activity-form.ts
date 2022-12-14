import { useEffect } from 'react';

import { Activity } from '@abstraction/types';
import { useFormEditing } from '@hooks/index';

export const useActivityForm = (initialActivity?: Partial<Activity>) => {
    const initialActivityValues: Activity = {
        title: '',
        description: '',
        imagesPaths: [],
        done: false,
        type: null,
        link: '',
        types: [],
    };

    const {
        values: activity,
        setValues: setActivity,
        handleValuesChange: handleActivityChange,
    } = useFormEditing(initialActivityValues);

    useEffect(() => {
        if (initialActivity) {
            setActivity(initialActivity);
        }
    }, [initialActivity, setActivity]);

    return { activity, setActivity, handleActivityChange };
};
