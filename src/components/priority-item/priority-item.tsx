import React from 'react';

import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from 'react-icons/fc';

import { Icon } from '@mui/material';

import { Priority } from '@abstraction/index';

type Props = {
  priority: Priority;
};

const priorityToIcon = {
  [Priority.NONE]: <></>,
  [Priority.LOW]: <FcLowPriority />,
  [Priority.MEDIUM]: <FcMediumPriority />,
  [Priority.HIGH]: <FcHighPriority />,
};

export const PriorityItem: React.FC<Props> = (props) => {
  const { priority } = props;

  return <Icon>{priorityToIcon[priority]}</Icon>;
};
