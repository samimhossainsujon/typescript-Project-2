import { UserModel } from '../user.model';
import { User } from './user.interface';

// =====================================
// create userIntoDB
// =====================================
const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

// =====================================
// get All User From DB
// =====================================

const getAllUserFromDB = async () => {
  const result = await UserModel.find().select({
    username: 1,
    fullNames: 1,
    age: 1,
    email: 1,
    address: 1,
    _id: 0,
  });
  return result;
};

// ======================================
// get singel user, get by userid
// ======================================

const getSingelUserFromDB = async (userId:number|string) => {
  const result = await UserModel.findOne({ userId }).select({
    userId: 1,
    username: 1,
    fullNames: 1,
    age: 1,
    email: 1,
    isActive: 1,
    hobbies: 1,
    address: 1,
    _id: 0,
  });
  return result;
};

// =======================================
// update User Data In DB
// =======================================

const updateUserDataInDB = async (
  userId: number|string,
  updatedData: {
    username?: string;
    fullNames?: {
      firstName: string;
      lastName: string;
    };
    age?: number;
    email?: string;
    isActive?: boolean;
    hobbies?: string[];
    address?: {
      street: string;
      city: string;
      country: string;
    };
  },
) => {
  const result = await UserModel.findOneAndUpdate({ userId }, updatedData, {
    new: true,
  }).select({
    userId: 1,
    username: 1,
    fullNames: 1,
    age: 1,
    email: 1,
    isActive: 1,
    hobbies: 1,
    address: 1,
    _id: 0,
  });

  if (!result) {
    throw new Error('User not found');
  }

  return result;
};

// =======================================
// delete User Data In DB
// =======================================

const deleteUserDataFromDB = async (userId: number |string) => {
  const result = await UserModel.findOneAndDelete({ userId });
  return result;
};

//==========================================
// Add New Product in Order
// =========================================

const UserOrdersInDB = async (
  userId: number |string,
  updatedData: {
    orders: {
      productName: string;
      price: number;
      quantity: number;
    };
  },
) => {
  const result = await UserModel.findOneAndUpdate({ userId }, updatedData, {
    new: true,
  }).select({
    orders: 1,
    _id: 0,
  });

  if (!result) {
    throw new Error('User not found');
  }

  return result;
};

// ===========================================
// get  orders for a specific user
// ===========================================

const getSingelUserOrdersFromDB = async (userId: number |string) => {
  const result = await UserModel.findOne({ userId }).select({
    orders: 1,
    _id: 0,
  });
  return result;
};

// ===========================================
//  Calculate Total Price of Orders for a Specific User
// ===========================================

const calculateTotalPriceSpecificUser = async (userId: number |string) => {
  const result = await UserModel.findOne({ userId }).select({
    orders: 1,
    _id: 0,
  });
  if (!result) {
    throw new Error('User not found');
  }
  const totalPrice = (result?.orders || []).reduce(
    (total: number, order: { price: number; quantity: number }) => {
      return total + (order.price || 0) * (order.quantity || 0);
    },
    0,
  );
  return totalPrice;
};

export const userServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingelUserFromDB,
  updateUserDataInDB,
  deleteUserDataFromDB,
  UserOrdersInDB,
  getSingelUserOrdersFromDB,
  calculateTotalPriceSpecificUser,
};
