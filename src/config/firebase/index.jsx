import * as firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyDJ0rINnvA3S_TJuiJ5YVb48fzCi43Yz3A',
    authDomain: 'my-bps-project.firebaseapp.com',
    projectId: 'my-bps-project',
    storageBucket: 'my-bps-project.appspot.com',
    messagingSenderId: '145689649723',
    appId: '1:145689649723:web:c678a6c66e2c75eb39f21e',
};

const app = firebase.initializeApp(firebaseConfig);

const auth = getAuth();
auth.languageCode = auth.useDeviceLanguage();
export default { auth, firebase };
console.info(app.name ? 'Firebase Mode Activated!' : 'Firebase not working :(');
