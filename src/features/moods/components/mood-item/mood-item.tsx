import React from 'react';

import Image from 'next/image';

import { Box, Button } from '@mui/material';

import { Mood } from '@abstraction/types';

type Props = {
  mood: Mood;
  onClick?: () => void;
};

export const MoodItem: React.FC<Props> = ({ mood, onClick }) => {
  return (
    <Button
      sx={{
        display: 'flex',
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: '1em',
        boxShadow: '0px 0px 6px 0px rgba(0,0,0,0.25)',
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <Image
          src={`/svgs/${mood.moodType}.svg`}
          alt={mood.moodType}
          layout={'fill'}
        />
      </Box>
    </Button>
  );
};
