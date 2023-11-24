import { UserModel } from '../user.model';
import { User } from './user.interface';

const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

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

export const userServices = {
  createUserIntoDB,
  getAllUserFromDB,
};
