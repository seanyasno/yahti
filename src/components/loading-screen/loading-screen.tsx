import React from 'react';
import { Box } from '@mui/material';
import HashLoader from 'react-spinners/HashLoader';
import { theme } from '@styles/theme/theme';

export const LoadingScreen: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '-webkit-fill-available',
            }}
        >
            <HashLoader
                color={theme.palette.secondary.main}
                loading={true}
                size={120}
            />
        </Box>
    );
};
