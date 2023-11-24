export type fullName = {
  firstName: 'string';
  lastName: 'string';
};

export type addres = {
  street: 'string';
  city: 'string';
  country: 'string';
};

export type order = {
  productName: string;
  price: number;
  quantity: number;
};

export type User = {
  userId: number;
  username: string;
  password: string;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  fullNames: fullName;
  address: addres;
  orders: order[];
};
