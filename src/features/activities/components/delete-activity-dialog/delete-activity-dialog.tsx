import React, { useCallback } from 'react';

import { useRouter } from 'next/router';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

import { Activity } from '@abstraction/types';
import { deleteActivity } from '@requests/firestore-requests/firestore-requests';
import { theme } from '@styles/theme/theme';

type Props = {
  open: boolean;
  activity: Activity;
  activityId: string;
  onClose?: () => void;
};

export const DeleteActivityDialog: React.FC<Props> = (props) => {
  const { open, activity, activityId, onClose } = props;
  const router = useRouter();

  const onDelete = useCallback(async () => {
    await deleteActivity(activityId);
    onClose();
    router.replace('/');
  }, [activityId, onClose, router]);

  const title = 'אז מה, למחוק?';
  const descriptionLeading = 'זה הולך להימחק: ';
  const deleteButtonLabel = 'טוב טוב למחוק';
  const cancelButtonLabel = 'עאהעאה לאלאלא';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      PaperProps={{ style: { borderRadius: '1em' } }}
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <Typography>
          {descriptionLeading} {activity?.title}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          variant={'text'}
          onClick={onClose}
          sx={{ color: theme.palette.text.primary }}
        >
          {cancelButtonLabel}
        </Button>

        <Button
          variant={'contained'}
          onClick={onDelete}
          sx={{
            backgroundColor: '#EF233B',
            color: 'white',
            borderRadius: '1em',
            fontWeight: 600,
          }}
        >
          {deleteButtonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
