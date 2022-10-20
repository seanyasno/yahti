import styled from '@emotion/styled';
import {Button} from '@mui/material';

export const EmojiButton = styled(Button)`
  border-radius: 50%;
  aspect-ratio: 1/1;
  font-size: 2rem;
  min-width: 80px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const ContinueButton = styled(Button)`
  padding: 12px 80px;
  font-size: 1.2rem;
  border-radius: 1em;
  position: absolute;
  bottom: 20px;
`;
