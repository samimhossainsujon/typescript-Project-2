import { Request, Response } from 'express';
import { userServices } from './user.service';

// =======================================
// create user
// =======================================
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await userServices.createUserIntoDB(user);
    res.status(200).json({
      success: true,
      message: 'user is created sucessfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

// =========================================
// all user get
// =========================================
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

// =========================================
//  single user get by user id
// =========================================

const getSingelUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;   
    if (!userId) {
      throw new Error('User ID is required'); 
    }
    const result = await userServices.getSingelUserFromDB(userId);
    if (!result) {
      throw new Error('User not found'); 
    }
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 400,
        description: 'User not found!',
      },
    });
  }
};

// =========================================
//  
// =========================================

export const userController = {
  createUser,
  getAllUser,
  getSingelUser,
};
