import { useFormik } from 'formik';

import { Activity } from '@abstraction/types';

export const useActivityForm = (
    initialActivity?: Partial<Activity>,
    onSubmit?: (activity: Activity) => Promise<void>
) => {
    const initialActivityValues: Activity = {
        title: '',
        description: '',
        imagesPaths: [],
        done: false,
        type: null,
        link: '',
        types: [],
    };

    const formik = useFormik<Activity>({
        initialValues: { ...initialActivityValues, ...initialActivity },
        onSubmit,
    });

    return {
        ...formik,
        activity: formik.values,
    };
};
