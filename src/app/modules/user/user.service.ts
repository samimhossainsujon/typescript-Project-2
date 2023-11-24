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
// 
// =======================================



export const userServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingelUserFromDB,
};
