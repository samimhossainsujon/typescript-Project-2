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
//  PUT singel data by userId
// =========================================

const updateSingelUser = async (req: Request, res: Response) => {
  try {
    const userId:string = req.params.userId;
    const updatedData = req.body;
    if (!userId) {
      throw new Error('User ID is required');
    }
    const result = await userServices.updateUserDataInDB(userId, updatedData);
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
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
//  single user delete
// =========================================

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      throw new Error('User ID is required');
    }
    await userServices.deleteUserDataFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to delete user',
      error: {
        code: 400,
        description: 'Failed to delete user',
      },
    });
  }
};

// ============================================
//  add new product in order
// ============================================

const singleUserOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const UserOrderData = req.body;

    if (!userId) {
      throw new Error('User ID is required');
    }
    await userServices.UserOrdersInDB(userId, UserOrderData);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
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

// ===========================================
// get orders a specific user
// ===========================================

const getSingelUserOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      throw new Error('User ID is required');
    }
    const result = await userServices.getSingelUserOrdersFromDB(userId);
    if (!result) {
      throw new Error('User not found');
    }
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
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

// ===========================================
//  Calculate Total Price of Orders for a Specific User
// ===========================================
const getSingelUserOrderTotalPrice = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      throw new Error('User ID is required');
    }
    const ordertotalPrice =
      await userServices.calculateTotalPriceSpecificUser(userId);
    if (!ordertotalPrice) {
      throw new Error('User not found');
    }
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: ordertotalPrice,
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

export const userController = {
  createUser,
  getAllUser,
  getSingelUser,
  updateSingelUser,
  deleteSingleUser,
  singleUserOrder,
  getSingelUserOrder,
  getSingelUserOrderTotalPrice,
};
