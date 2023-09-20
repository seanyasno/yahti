import React, { useCallback } from 'react';

import { FiLogOut } from 'react-icons/fi';

import { auth } from '@config/index';
import { Button, SwipeableDrawer } from '@mui/material';

type Props = {
    open: boolean;
    onClose: () => void;
    onOpen: () => void;
};

export const HomeDrawer: React.FC<Props> = (props) => {
    const { open, onClose, onOpen } = props;

    const signOutButtonTitle = 'להתנתק';

    const onEnableNotifications = useCallback(() => {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                alert('עכשיו אפשר לקבל התראות');
            } else {
                alert('לא ניתן לקבל התראות');
            }
        });
    }, []);

    const onSignOut = useCallback(async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error(error);
        }
    }, [auth]);

    return (
        <SwipeableDrawer
            anchor={'left'}
            open={open}
            onClose={onClose}
            onOpen={onOpen}
            PaperProps={{
                sx: {
                    minWidth: '140px',
                },
            }}
        >
            <Button color={'secondary'} onClick={onEnableNotifications}>
                אפשר התראות
            </Button>
            <Button color={'secondary'} onClick={onSignOut}>
                <FiLogOut style={{ margin: '0 0 0 4px' }} />{' '}
                {signOutButtonTitle}
            </Button>
        </SwipeableDrawer>
    );
};
