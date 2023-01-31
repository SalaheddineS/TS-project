import { Document } from "mongoose";

export interface IUser extends Document {
  name: {
    type: String;
  };
  lastname: {
    type: String;
  };
  email: {
    type: String;
  };
  address: {
    type: String;
  };
  phone: {
    type: String;
  };
  password: {
    type: String;
  };
  role: {
    type: String;
  };
  isAdmin: {
    type: Boolean;
  };
  image: {
    type: String;
  };
}
