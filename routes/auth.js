const express = require('express');
const router = express.Router();
const { auth } = require('../config/firebase');

// Middleware to verify Firebase ID token
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Verify token endpoint (used by frontend to check authentication)
router.post('/verify', verifyToken, (req, res) => {
  res.json({ 
    message: 'Token is valid', 
    user: { 
      uid: req.user.uid, 
      email: req.user.email 
    } 
  });
});

// Get user data endpoint
router.get('/user', verifyToken, async (req, res) => {
  try {
    const user = await auth.getUser(req.user.uid);
    res.json({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified
    });
  } catch (error) {
    console.error('Error getting user data:', error);
    res.status(500).json({ error: 'Failed to get user data' });
  }
});

module.exports = router;