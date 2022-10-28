import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from '@firebase/storage';
import {getAuth} from '@firebase/auth';

export const config = {
   firebase: {
       apiKey: "AIzaSyBgLSQhT6r69Kic0qBstFhsj4MeI7NaL8w",
       authDomain: "shir-524a2.firebaseapp.com",
       databaseURL: "https://shir-524a2-default-rtdb.europe-west1.firebasedatabase.app",
       projectId: "shir-524a2",
       storageBucket: "shir-524a2.appspot.com",
       messagingSenderId: "496647140076",
       appId: "1:496647140076:web:53a05340674cb140c7ebc9",
       measurementId: "G-70WWF16CEW"
   }
};

export const app = initializeApp(config.firebase);
// export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
