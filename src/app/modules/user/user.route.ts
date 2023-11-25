import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/users', userController.createUser);

router.get('/users', userController.getAllUser);
router.get('/users/:userId', userController.getSingelUser);
router.put('/users/:userId', userController.updateSingelUser);
router.delete('/users/:userId', userController.deleteSingleUser);

router.put('/users/:userId/orders', userController.singleUserOrder);
router.get('/users/:userId/orders', userController.getSingelUserOrder);
router.get(
  '/users/:userId/total-price',
  userController.getSingelUserOrderTotalPrice,
);

export const UserRoutes = router;
