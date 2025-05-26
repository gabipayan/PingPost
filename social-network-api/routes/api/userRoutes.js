import express from 'express';
import { userController } from '../../controllers/userController.js';

const router = express.Router();

// /api/users
router.route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

// /api/users/:userId
router.route('/:userId')
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
  .post(userController.addFriend)
  .delete(userController.removeFriend);

export default router;
