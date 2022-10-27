import {useMutation, useQueryClient} from '@tanstack/react-query';
import {doc, setDoc} from '@firebase/firestore';
import {db} from '@config/index';
import {Activity} from '@abstraction/types';

export const useToggleActivity = (activity: Activity, id: string) => {
    const queryClient = useQueryClient();

    const {mutateAsync: toggleActivity, isSuccess, data} = useMutation({
        mutationKey: ['activity', id],
        mutationFn: async () => {
            await setDoc(doc(db, 'activities', id), {
                done: !activity.done,
            }, {merge: true});
            queryClient.setQueryData(['activities'], (oldData: { activity: Activity, id: string }[]) => {
                return oldData?.map((item) => {
                    if (item.id === id) {
                        return {
                            ...item,
                            activity: {
                                ...item.activity,
                                done: !item.activity.done,
                            },
                        };
                    }
                    return item;
                });
            });
            return !activity.done;
        },
    });

    return {toggleActivity, isSuccess, data};
};
