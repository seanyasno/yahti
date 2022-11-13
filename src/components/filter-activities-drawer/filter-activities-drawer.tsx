import React, { useCallback } from 'react';

import { emojiByActivityType } from '@constants/index';
import styled from '@emotion/styled';
import {
    Box,
    Button,
    Divider,
    IconButton,
    Stack,
    SwipeableDrawer,
    Typography,
} from '@mui/material';

import { ActivityType } from '@abstraction/enums';
import { useTypeSelection } from '@hooks/use-type-selection/use-type-selection';
import { ActivityType as StyledActivityType } from '@styles/index';

type Props = {
    open: boolean;
    onClose: () => void;
    onOpen: () => void;
    onFilter?: (types: ActivityType[]) => void;
};

export const FilterActivitiesDrawer: React.FC<Props> = (props) => {
    const { open, onClose, onOpen, onFilter } = props;
    const { selectedTypes, setSelectedTypes, isTypeSelected, onTypeSelected } =
        useTypeSelection();

    const filterTitle = 'נסנן כמה דברים';
    const filterActivityTypeTitle = 'סוג הפעילות';
    const filterButtonTitle = 'יאללה נסנן';
    const resetButtonTitle = 'לאפס';

    const onReset = useCallback(() => {
        setSelectedTypes([]);
    }, [setSelectedTypes]);

    const handleOnFilter = useCallback(() => {
        onFilter?.(selectedTypes);
    }, [selectedTypes, onFilter]);

    return (
        <SwipeableDrawer
            anchor={'bottom'}
            open={open}
            onClose={onClose}
            onOpen={onOpen}
            PaperProps={{
                sx: {
                    borderRadius: '20px 20px 0 0',
                    padding: '20px',
                    height: '50%',
                },
            }}
        >
            <Stack>
                <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <Button
                        variant={'text'}
                        sx={{
                            fontSize: '16px',
                            padding: 0,
                            color: 'transparent !important',
                        }}
                        disabled
                    >
                        {resetButtonTitle}
                    </Button>

                    <Typography variant={'h5'} textAlign={'center'}>
                        {filterTitle}
                    </Typography>

                    <Button
                        variant={'text'}
                        color={'secondary'}
                        sx={{ fontSize: '16px', padding: 0 }}
                        onClick={onReset}
                    >
                        {resetButtonTitle}
                    </Button>
                </Stack>

                <Stack spacing={1}>
                    <Typography variant={'h6'}>
                        {filterActivityTypeTitle}
                    </Typography>

                    <Stack
                        direction={'row'}
                        spacing={2}
                        overflow={'auto'}
                        padding={'0 0 20px 0'}
                    >
                        {Object.values(ActivityType).map((type, index) => (
                            <IconButton
                                key={index}
                                sx={{
                                    padding: '0',
                                    border: isTypeSelected(type)
                                        ? '1px solid black'
                                        : 'none',
                                }}
                                onClick={() => onTypeSelected(type)}
                            >
                                <StyledActivityType
                                    sx={{
                                        width: '30px !important',
                                        height: '30px !important',
                                        fontSize: '18px !important',
                                    }}
                                >
                                    {emojiByActivityType[type]}
                                </StyledActivityType>
                            </IconButton>
                        ))}
                    </Stack>

                    <Divider />
                </Stack>
            </Stack>

            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    alignItems: 'flex-end',
                }}
            >
                <Button
                    variant={'contained'}
                    color={'secondary'}
                    sx={{
                        borderRadius: '.8em',
                        width: '100%',
                        height: 'min-content',
                    }}
                    onClick={handleOnFilter}
                >
                    {filterButtonTitle}
                </Button>
            </Box>
        </SwipeableDrawer>
    );
};
