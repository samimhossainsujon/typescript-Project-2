import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/users', userController.createUser);

router.get('/users', userController.getAllUser);
router.get('/users/:userId', userController.getSingelUser);
router.put('/users/:userId', userController.updateSingelUser);

export const UserRoutes = router;
