import styled from '@emotion/styled';
import { Button, Container } from '@mui/material';

import { ActivityType, StyledIconButton } from '@styles/index';

export const StyledContainer = styled(Container)`
  height: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0 20px;
`;

export const Card = styled.div`
  background-color: #fff;
  padding: 26px 20px;
  border-radius: 1em;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin-bottom: 20px;
`;

export const StyledBackButton = styled(StyledIconButton)`
  max-width: fit-content;
  margin-bottom: 0 !important;
`;

export const UrlButton = styled(Button)`
  padding: 0;
  font-weight: 300;
`;

export const DoneButton = styled(Button)`
  padding: 12px 80px;
  font-size: 1.2rem;
  border-radius: 1em;
  width: 100%;
  margin-top: auto;
`;

export const ImageContainer = styled.div`
  min-height: 300px;
  display: flex;
  position: relative;
  margin: 16px 0;
`;

export const StyledActivityType = styled(ActivityType)`
  width: 40px !important;
  height: 40px !important;
  font-size: 22px !important;
`;
