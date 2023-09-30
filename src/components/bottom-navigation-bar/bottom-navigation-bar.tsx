import React from 'react';

import { useRouter } from 'next/router';

import { BsFlagFill } from 'react-icons/bs';
import { MdMood } from 'react-icons/md';

import {
  BottomNavigation,
  BottomNavigationAction,
  Typography,
} from '@mui/material';

import { theme } from '@styles/theme/theme';

const ACTIVE_COLOR = theme.palette.secondary.main;
const INACTIVE_COLOR = '#adb5bd';

const PATHS = {
  Moods: '/moods',
  Activities: '/',
} as const;
type Path = typeof PATHS[keyof typeof PATHS];

export const BottomNavigationBar: React.FC = () => {
  const router = useRouter();

  const getColor = (path: Path) =>
    path === router.pathname ? ACTIVE_COLOR : INACTIVE_COLOR;

  return (
    <BottomNavigation
      value={0}
      onChange={(_, newValue) => router.replace(newValue)}
      sx={{
        borderRadius: '12px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
      }}
      showLabels
    >
      <BottomNavigationAction
        label={<Typography color={getColor(PATHS.Moods)}>הרגשות</Typography>}
        value={'/moods'}
        icon={
          <MdMood
            style={{ marginTop: '10px' }}
            size={20}
            color={getColor(PATHS.Moods)}
          />
        }
      />
      <BottomNavigationAction
        label={<Typography color={getColor(PATHS.Activities)}>פעילויות</Typography>}
        value={'/'}
        icon={
          <BsFlagFill
            style={{ marginTop: '10px' }}
            size={20}
            color={getColor(PATHS.Activities)}
          />
        }
      />
    </BottomNavigation>
  );
};
