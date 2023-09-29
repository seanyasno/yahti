import React, { useCallback } from 'react';

import { FiLogOut } from 'react-icons/fi';

import { app, auth } from '@config/index';
import { getMessaging, getToken } from '@firebase/messaging';
import { Button, SwipeableDrawer } from '@mui/material';

import { saveDeviceToken } from '@requests/firestore-requests/firestore-requests';
import Link from 'next/link';

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
                const messaging = getMessaging(app);
                getToken(messaging, {
                    vapidKey:
                        'BBb2YcgCC2p0WSIjdfw4av-YDo3yGwOvvDZgpPSJPIh5GTKOmzC4hxbTmxQX51G4LiBWQcCV5iATiAzLYcX0VMM',
                }).then((token) => {
                    saveDeviceToken(auth?.currentUser?.email, token).then(
                        () => {
                            alert('עכשיו אפשר לקבל התראות');
                        }
                    );
                });
            } else {
                alert('לא ניתן לקבל התראות');
            }
        });
    }, [auth?.currentUser]);

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
            <Button color={'secondary'}>
                <Link href={'/moods'}>
                    שליחת הרתאות
                </Link>
            </Button>
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
