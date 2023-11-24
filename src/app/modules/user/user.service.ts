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

const getSingelUserFromDB = async (userId: string) => {
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
  userId: string,
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

const deleteUserDataFromDB = async (userId: string) => {
  try {
    const result = await UserModel.findOneAndDelete({ userId });

    if (!result) {
      throw new Error('User not found');
    }

    return result;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to delete user');
  }
};

export const userServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingelUserFromDB,
  updateUserDataInDB,
  deleteUserDataFromDB
};
