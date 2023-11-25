import { Schema, model } from 'mongoose';
import { User, addres, fullName, order } from './user/user.interface';

const fullNameSchema = new Schema<fullName>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { _id: false },
);

const addressSchema = new Schema<addres>(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false },
);

const ordersSchema = new Schema<order>(
  {
    productName: { type: String },
    price: { type: Number },
    quantity: { type: Number },
  },
  { _id: false },
);

const userSchema = new Schema<User>({
  userId: { type: Number, required: true, unique: true },
  username: {
    type: String,
    required: [true, 'username is required'],
    unique: true,
  },
  password: { type: String, required: true },
  fullNames: {
    type: fullNameSchema,
    required: true,
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  hobbies: { type: [String] },
  isActive: { type: Boolean },
  address: {
    type: addressSchema,
    required: true,
  },
  orders: {
    type: [ordersSchema],
  },
});

export const UserModel = model<User>('User', userSchema);
