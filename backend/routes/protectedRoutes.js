import express from 'express';
const router = express.Router();
import verifyToken from '../middlewares/verifyToken.js'; // Path to the middleware

// Example of a protected route
router.get('/protected-route', verifyToken, (req, res) => {
  res.json({ message: 'You have access to this protected route.', user: req.user });
});

export default router;
