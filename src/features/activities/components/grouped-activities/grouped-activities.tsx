import React, { useState } from 'react';

import { useRouter } from 'next/router';

import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

import { Box, Collapse, IconButton, Stack, Typography } from '@mui/material';

import { ActivityType } from '@abstraction/enums';
import { Activity } from '@abstraction/types';
import { ActivityItem } from '@features/activities';

type Props = {
  activities: { activity: Activity; id: string }[];
  type: ActivityType;
};

export const GroupedActivities: React.FC<Props> = (props) => {
  const { activities, type } = props;
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const filteredActivities = activities.filter(({ activity }) =>
    activity.types.includes(type)
  );

  if (filteredActivities.length === 0) {
    return <React.Fragment />;
  }

  return (
    <React.Fragment>
      <Stack direction={'row'} alignItems={'center'}>
        <Typography variant={'h6'}>{type}</Typography>
        <IconButton onClick={() => setOpen((current) => !current)}>
          {open ? <BiChevronDown /> : <BiChevronUp />}
        </IconButton>
      </Stack>

      <Collapse in={open}>
        <Stack direction={'column'} spacing={2}>
          {filteredActivities.map(({ activity, id }, index) => (
            <Box onClick={() => router.push(`/activity/${id}`)} key={index}>
              <ActivityItem id={id} activity={activity} />
            </Box>
          ))}
        </Stack>
      </Collapse>
    </React.Fragment>
  );
};
