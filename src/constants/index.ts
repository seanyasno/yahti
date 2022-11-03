import { ActivityType } from '@abstraction/index';

export const emojiByActivityType: { [key: string]: string } = {
    [ActivityType.HOME]: '🏠',
    [ActivityType.RESTAURANT]: '🍽️',
    [ActivityType.TRIP]: '🚌',
    [ActivityType.SHOPPING]: '🛍️',
    [ActivityType.SPORT]: '🏃‍♂️',
    [ActivityType.LOVING]: '❤️',
    [ActivityType.GAMING]: '🎮',
    [ActivityType.ESCAPE_ROOM]: '🔓',
    [ActivityType.OTHER]: '🤷‍♂️',
};
