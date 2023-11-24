import { Schema, model } from 'mongoose';
import { User, addres, fullName, order } from './user/user.interface';

const fullNameSchema = new Schema<fullName>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { _id: false },
);

const addressSchema = new Schema<addres>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
}, { _id: false } );

const ordersSchema = new Schema<order>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
}, { _id: false } );

const userSchema = new Schema<User>({
  userId: { type: Number, required: [true, 'ID is required'], unique: true },
  username: { type: String, required: true },
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
    required: true,
  },
});

export const UserModel = model<User>('User', userSchema);
