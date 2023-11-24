import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/users', userController.createUser);

router.get('/users', userController.getAllUser);
router.get('/users/:userId', userController.getSingelUser)

export const UserRoutes = router;
