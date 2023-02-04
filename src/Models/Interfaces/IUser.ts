import { City_Enum } from "../../../Enums/City_Enum";
import { gender_Enum } from "../../../Enums/Gender_Enum";
export interface IUser {
  name: String;

  gender: gender_Enum;

  lastname: String;

  email: String;

  address: String;

  city: City_Enum;

  phone: String;

  password: string;

  role: String;

  isAdmin: Boolean;

  isSeller: Boolean;

  image: String;
}
