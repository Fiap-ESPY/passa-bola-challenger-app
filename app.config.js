import 'dotenv/config';

export default {
  expo: {
    name: 'passa-bola-challenger-app',
    slug: 'passa-bola-challenger-app',
    version: '1.0.0',
    android: {
      package: 'com.fiap.passabolachallenger',
    },
    extra: {
      firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
      },
      eas: {
        projectId: '0d6d98ac-5f73-428b-bad0-a6fe7bd1f9b7',
      },
    },
  },
};
