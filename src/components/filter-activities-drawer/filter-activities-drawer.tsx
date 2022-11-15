import React, { useCallback, useState } from 'react';

import { emojiByActivityType } from '@constants/index';
import {
    Divider,
    IconButton,
    MenuItem,
    Select,
    Stack,
    SwipeableDrawer,
    Typography,
} from '@mui/material';

import { ActivityType } from '@abstraction/enums';
import { useTypeSelection } from '@hooks/index';

import {
    FilterButton,
    FilterButtonContainer,
    OverrideStyledActivityType,
    ResetButton,
    TempButton,
} from './styles';

type Props = {
    open: boolean;
    onClose: () => void;
    onOpen: () => void;
    onFilter?: (types: ActivityType[], groupBy: string) => void;
};

export const FilterActivitiesDrawer: React.FC<Props> = (props) => {
    const { open, onClose, onOpen, onFilter } = props;
    const { selectedTypes, setSelectedTypes, isTypeSelected, onTypeSelected } =
        useTypeSelection();
    const [groupBy, setGroupBy] = useState('');

    const filterTitle = 'נסנן כמה דברים';
    const filterActivityTypeTitle = 'סוג הפעילות';
    const filterButtonTitle = 'יאללה נסנן';
    const resetButtonTitle = 'לאפס';
    const orderByTitle = 'נקבץ לפי';

    const onReset = useCallback(() => {
        setSelectedTypes([]);
        setGroupBy('');
    }, [setSelectedTypes, setGroupBy]);

    const handleOnFilter = useCallback(() => {
        onFilter?.(selectedTypes, groupBy);
    }, [selectedTypes, groupBy, onFilter]);

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
                    <TempButton variant={'text'} disabled>
                        {resetButtonTitle}
                    </TempButton>

                    <Typography variant={'h5'} textAlign={'center'}>
                        {filterTitle}
                    </Typography>

                    <ResetButton
                        variant={'text'}
                        color={'secondary'}
                        onClick={onReset}
                    >
                        {resetButtonTitle}
                    </ResetButton>
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
                                <OverrideStyledActivityType>
                                    {emojiByActivityType[type]}
                                </OverrideStyledActivityType>
                            </IconButton>
                        ))}
                    </Stack>

                    <Divider />

                    <Typography variant={'h6'}>{orderByTitle}</Typography>
                    <Select
                        variant={'standard'}
                        value={groupBy}
                        onChange={(event) =>
                            setGroupBy(event.target.value as string)
                        }
                    >
                        <MenuItem value={''}>
                            <em>כלום</em>
                        </MenuItem>
                        <MenuItem value={'type'}>סוג הפעילות</MenuItem>
                    </Select>

                    <Divider />
                </Stack>
            </Stack>

            <FilterButtonContainer>
                <FilterButton
                    variant={'contained'}
                    color={'secondary'}
                    onClick={handleOnFilter}
                >
                    {filterButtonTitle}
                </FilterButton>
            </FilterButtonContainer>
        </SwipeableDrawer>
    );
};
