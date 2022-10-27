import {ActivityType} from '@abstraction/index';

export type Activity = {
    title: string;
    description?: string;
    link?: string;
    done?: boolean;
    type?: ActivityType;
    images?: File[] | string[];
}
