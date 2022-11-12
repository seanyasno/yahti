import React, { useCallback, useReducer } from 'react';

export const useFormEditing = <T>(initialValues: T) => {
    const [values, setValues] = useReducer<React.Reducer<T, Partial<T>>>(
        (currentValues, newValues) => ({ ...currentValues, ...newValues }),
        initialValues
    );

    const handleValuesChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            setValues({ [name]: value } as unknown as Partial<T>);
        },
        [setValues]
    );

    return { values, setValues, handleValuesChange };
};
