const admin = require('firebase-admin');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Path to your service account key JSON file
const serviceAccountPath = path.join(__dirname, '..\M:\downloadS/undergraduationadmin-a50d9-firebase-adminsdk-fbsvc-3d36621434.json');

let app;
try {
  // Try to use the service account key file
  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
} catch (error) {
  console.error('Error initializing Firebase with service account file:', error.message);
  
  // Fallback to environment variables
  try {
    const serviceAccount = {
      type: process.env.FIREBASE_TYPE,
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
    };

    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
  } catch (fallbackError) {
    console.error('Error initializing Firebase with environment variables:', fallbackError.message);
    throw new Error('Failed to initialize Firebase Admin SDK');
  }
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };