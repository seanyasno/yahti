importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const config = {
    apiKey: 'AIzaSyBgLSQhT6r69Kic0qBstFhsj4MeI7NaL8w',
    authDomain: 'shir-524a2.firebaseapp.com',
    databaseURL:
        'https://shir-524a2-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'shir-524a2',
    storageBucket: 'shir-524a2.appspot.com',
    messagingSenderId: '496647140076',
    appId: '1:496647140076:web:53a05340674cb140c7ebc9',
    measurementId: 'G-70WWF16CEW',
};

firebase.initializeApp(config);

let messaging = null;
if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
}

// messaging?.onBackgroundMessage(function (payload) {
//     console.log(
//         '[firebase-messaging-sw.js] Received background message ',
//         payload
//     );
//     // Customize notification here
//     // const notificationTitle = 'Background Message Title';
//     // const notificationOptions = {
//     //     body: 'Background Message body.',
//     //     icon: '/firebase-logo.png',
//     // };
//
//     // self.registration.showNotification(notificationTitle, notificationOptions);
// });
