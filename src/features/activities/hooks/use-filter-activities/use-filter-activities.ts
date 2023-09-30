import { useMemo, useState } from 'react';

import { isEmpty } from 'lodash';

import { ActivityType } from '@abstraction/enums';
import { Activity } from '@abstraction/types';

export const useFilterActivities = (
  activities: { activity: Activity; id: string }[],
  activitySearchText: string
) => {
  const [groupBy, setGroupBy] = useState('');
  const [filteredTypes, setFilteredTypes] = useState<ActivityType[]>([]);

  const hasFilter = useMemo(
    () => filteredTypes.length > 0 || groupBy,
    [filteredTypes.length, groupBy]
  );

  const filteredActivities = useMemo(() => {
    let filteredActivitiesByTypes = [];

    if (filteredTypes.length === 0) {
      filteredActivitiesByTypes = activities;
    } else {
      filteredActivitiesByTypes = activities.filter(({ activity }) =>
        activity.types.some((type) => filteredTypes.includes(type))
      );
    }

    if (isEmpty(activitySearchText)) {
      return filteredActivitiesByTypes;
    }

    return filteredActivitiesByTypes.filter(({ activity }) =>
      activity.title.toLowerCase().includes(activitySearchText.toLowerCase())
    );
  }, [activities, activitySearchText, filteredTypes]);

  return {
    groupBy,
    filteredTypes,
    filteredActivities,
    hasFilter,
    setGroupBy,
    setFilteredTypes,
  };
};
