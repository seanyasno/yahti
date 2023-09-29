import serviceAccountKey from '@config/serviceAccountKey.json';
import { Request, Response } from 'express';
import admin from 'firebase-admin';
import { z } from 'zod';

let adminApp;

function initializeFirebaseAdmin() {
    try {
        adminApp = admin.app('admin');
    } catch (error) {
        if (error?.errorInfo?.code === 'app/no-app') {
            adminApp = admin.initializeApp(
                {
                    credential: admin.credential.cert(serviceAccountKey as any),
                },
                'admin'
            );
        }

        console.error(error);
    }
}

if (!adminApp) {
    initializeFirebaseAdmin();
}

export default async function handler(request: Request, response: Response) {
    if (request.method !== 'POST') {
        response.status(400).json({
            message: 'There was an error',
        });
    }

    if (!adminApp) {
        initializeFirebaseAdmin();
    }

    const message = MessageSchema.parse(request.body);

    try {
        const response = await adminApp.messaging().send(message);
    } catch (error) {
        console.error(error);
    }

    return response.json({
        status: 'success',
    });
}

const NotificationSchema = z.object({
    title: z.string(),
    body: z.string(),
});

const MessageSchema = z.object({
    notification: NotificationSchema,
    token: z.string(),
});