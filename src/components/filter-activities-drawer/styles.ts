import styled from '@emotion/styled';
import { Button } from '@mui/material';

import { ActivityType as StyledActivityType } from '@styles/index';

export const OverrideStyledActivityType = styled(StyledActivityType)`
    width: 30px !important;
    height: 30px !important;
    font-size: 18px !important;
`;

export const TempButton = styled(Button)`
    font-size: 16px;
    padding: 0;
    color: transparent !important;
`;

export const ResetButton = styled(Button)`
    font-size: 16px;
    padding: 0;
`;

export const FilterButtonContainer = styled.div`
    display: flex;
    flex: 1;
    align-items: flex-end;
`;

export const FilterButton = styled(Button)`
    border-radius: 0.8em;
    width: 100%;
    height: min-content;
`;
