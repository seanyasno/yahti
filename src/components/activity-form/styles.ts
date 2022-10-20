import styled from '@emotion/styled';
import {Box, Button, Divider} from '@mui/material';

export const CreateButton = styled(Button)`
  padding: 12px 80px;
  font-size: 1.2rem;
  border-radius: 1em;
  position: absolute;
  bottom: 20px;
`;

export const CreateButtonContainer = styled(Box)`
  width: 100%;
  justify-content: center;
  display: flex;
`;

export const UploadPhotoContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 4px;
`;

export const UploadPhotoButton = styled(Button)`
  text-transform: none;
  padding: 0;
  font-size: 16px;
  font-weight: 700
`;

export const StyledDivider = styled(Divider)`
  margin: 10px 0;
`;
