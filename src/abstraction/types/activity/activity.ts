import {ActivityType} from '@abstraction/index';

export type Activity = {
    title: string;
    description?: string;
    done?: boolean;
    type?: ActivityType;
}
