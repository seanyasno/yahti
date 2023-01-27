import { ActivityType, Priority } from '@abstraction/index';

export type Activity = {
    title: string;
    description?: string;
    link?: string;
    done?: boolean;
    types?: ActivityType[];
    priority?: Priority;
};
