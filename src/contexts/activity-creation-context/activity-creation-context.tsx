import React, {createContext, PropsWithChildren, useCallback, useReducer} from 'react';
import {Activity} from '@abstraction/index';
import {createActivity} from '@requests/index';

type ContextType = {
    activity: Activity;
    setActivity: (activity: Partial<Activity>) => void;
    onSuccess: () => Promise<void>;
}

export const ActivityCreationContext = createContext<ContextType>(null);

export const ActivityCreationProvider: React.FC<PropsWithChildren> = (props) => {
    const {children} = props;
    const [activity, setActivity] = useReducer((state, newState) => ({...state, ...newState}), null);

    const onSuccess = useCallback(async () => {
        await createActivity(activity);
    }, [activity]);

    return (
        <ActivityCreationContext.Provider value={{
            activity,
            setActivity,
            onSuccess,
        }}>
            {children}
        </ActivityCreationContext.Provider>
    );
};
