import React, { useEffect, useState } from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { GoLinkExternal } from 'react-icons/go';
import { GrEdit } from 'react-icons/gr';
import {
  IoCheckmarkDoneCircleOutline,
  IoCheckmarkDoneCircleSharp,
} from 'react-icons/io5';
import { MdDeleteForever } from 'react-icons/md';

import { auth } from '@config/index';
import { emojiByActivityType } from '@constants/index';
import {
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useAuthState } from 'react-firebase-hooks/auth';

import { BackButton, ImageWrapper, LoadingScreen } from '@components/index';
import { DeleteActivityDialog } from '@features/activities';
import {
  CommentItem,
  CreateCommentInput,
  useComments,
} from '@features/comments';
import {
  fetchActivityById,
  fetchImagesByActivityId,
  updateActivity,
} from '@requests/index';
import {
  Card,
  ImageContainer,
  StyledActivityType,
  StyledBackButton,
  StyledContainer,
} from '@styles/activity-page/activity-page-styles';
import { openUrlInNewTab } from '@utils/index';

export const ActivityPage: NextPage = () => {
  const router = useRouter();
  const [openFullImageDialog, setOpenFullImageDialog] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { data: activity } = useQuery({
    queryKey: ['activity', router?.query?.activityId],
    queryFn: async () => fetchActivityById(router.query.activityId as string),
    enabled: !isEmpty(router?.query?.activityId),
  });

  const { data: imagesReferences } = useQuery({
    queryKey: ['activity-images', router?.query?.activityId],
    queryFn: async () => {
      const images = await fetchImagesByActivityId(
        router.query.activityId as string
      );

      return images.items;
    },
    enabled: !isEmpty(activity),
  });

  const { data: comments } = useComments(router.query.activityId as string);

  const { mutateAsync: toggleActivity } = useMutation({
    mutationFn: async () =>
      updateActivity(router.query.activityId as string, {
        done: !activity.done,
      }),
    onSuccess: () => (activity.done = !activity.done),
  });

  const onEdit = () => router.push(`/edit-activity/${router.query.activityId}`);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, router, user]);

  if (!activity) {
    return <LoadingScreen />;
  }

  const { title, link, types, done, description } = activity;

  const linkTitle = 'קישור לאתר';
  const descriptionTitle = 'קצת תיאור על ההרפתקה שלנו';

  return (
    <StyledContainer maxWidth={'sm'}>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        mb={'16px'}
      >
        <BackButton />

        <Stack direction={'row'} alignItems={'center'} columnGap={'8px'}>
          <StyledBackButton onClick={() => setOpenDeleteDialog(true)}>
            <MdDeleteForever
              color={'#EF233B'}
              size={20}
              style={{ transform: 'rotate(180deg)' }}
            />
          </StyledBackButton>
          <StyledBackButton onClick={onEdit}>
            <GrEdit size={20} style={{ transform: 'rotate(180deg)' }} />
          </StyledBackButton>
        </Stack>
      </Stack>

      <Card>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'start'}
        >
          <Typography fontWeight={700} variant={'h5'}>
            <IconButton
              onClick={() => toggleActivity()}
              sx={{
                padding: 0,
                color: done ? '#2a9d8f' : '',
              }}
            >
              {done ? (
                <IoCheckmarkDoneCircleSharp size={'48px'} />
              ) : (
                <IoCheckmarkDoneCircleOutline size={'48px'} />
              )}
            </IconButton>
            {'  '}
            {title}
          </Typography>
        </Stack>

        {imagesReferences?.length > 0 && (
          <ImageContainer onClick={() => setOpenFullImageDialog(true)}>
            <ImageWrapper
              imageRef={imagesReferences[0]}
              alt={'activity image'}
              layout={'fill'}
              objectFit={'cover'}
              priority
              style={{ borderRadius: '1em' }}
            />
          </ImageContainer>
        )}

        <Stack
          direction={'row'}
          spacing={1}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          {link && (
            <Stack direction={'row'} spacing={0.5} alignItems={'center'}>
              <Typography variant={'body2'}>{linkTitle}</Typography>
              <IconButton
                sx={{ padding: 0 }}
                onClick={() => openUrlInNewTab(activity.link)}
              >
                <GoLinkExternal size={'20px'} />
              </IconButton>
            </Stack>
          )}

          <Stack
            direction={'row'}
            width={'100%'}
            justifyContent={'flex-end'}
            spacing={2}
          >
            {types?.map((type, index) => (
              <StyledActivityType key={index}>
                {emojiByActivityType[type]}
              </StyledActivityType>
            ))}
          </Stack>
        </Stack>
        {description && (
          <React.Fragment>
            <Divider sx={{ margin: '10px 0' }} />

            <Typography variant={'subtitle1'} fontWeight={600}>
              {descriptionTitle}
            </Typography>
            <Typography variant={'body2'}>{description}</Typography>
          </React.Fragment>
        )}
      </Card>

      <Stack spacing={2} mb={'20px'}>
        {comments
          ?.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
          ?.map((comment, index) => (
            <CommentItem comment={comment} key={index} />
          ))}

        <CreateCommentInput activityId={router.query.activityId as string} />
      </Stack>

      <DeleteActivityDialog
        open={openDeleteDialog}
        activity={activity}
        activityId={router.query.activityId as string}
        onClose={() => setOpenDeleteDialog(false)}
      />

      <Dialog
        open={openFullImageDialog}
        onClick={() => setOpenFullImageDialog(false)}
        onClose={() => setOpenFullImageDialog(false)}
        fullScreen
        PaperProps={{
          sx: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
        sx={{
          padding: '20px',
        }}
      >
        <DialogContent>
          <ImageWrapper
            imageRef={imagesReferences?.[0]}
            layout={'fill'}
            objectFit={'contain'}
            priority
            alt={''}
          />
        </DialogContent>
      </Dialog>
    </StyledContainer>
  );
};

export default ActivityPage;
