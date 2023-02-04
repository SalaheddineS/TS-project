import mongoose, { model } from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlenght: 2,
    maxlenght: 50,
  },
  lastname: {
    type: String,
    required: true,
    minlenght: 2,
    maxlenght: 50,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    unique: true,
  },
  city: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  address: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 250,
  },
  phone: {
    type: String,
    required: true,
    match:
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  isSeller: {
    type: Boolean,
    required: true,
    default: false,
  },
  image: {
    type: String,
    required: true,
    default: process.env.DEFAULT_IMAGE,
  },
});

export default model("User", UserSchema);
