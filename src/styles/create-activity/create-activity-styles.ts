import styled from '@emotion/styled';
import {IconButton} from '@mui/material';
import {theme} from '../theme/theme';

export const BackButton = styled(IconButton)` 
  background-color: ${theme.palette.primary.main};
  border-radius: 12px;
  padding: 12px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  transform: rotate(180deg);
  margin-bottom: 12px;
`;

export const Container = styled.div`
  margin: 20px 20px 40px 20px;
`;
