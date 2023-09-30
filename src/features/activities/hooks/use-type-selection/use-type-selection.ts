import { useCallback, useState } from 'react';

import { ActivityType } from '@abstraction/enums';

export const useTypeSelection = (initialSelectedTypes: ActivityType[] = []) => {
  const [selectedTypes, setSelectedTypes] =
    useState<ActivityType[]>(initialSelectedTypes);

  const onTypeSelected = useCallback(
    (type: ActivityType) => {
      if (selectedTypes.includes(type)) {
        setSelectedTypes(
          selectedTypes.filter((activityType) => activityType !== type)
        );
      } else {
        setSelectedTypes([...selectedTypes, type]);
      }
    },
    [selectedTypes, setSelectedTypes]
  );

  const isTypeSelected = useCallback(
    (type: ActivityType) => selectedTypes.includes(type),
    [selectedTypes]
  );

  return { selectedTypes, setSelectedTypes, onTypeSelected, isTypeSelected };
};
