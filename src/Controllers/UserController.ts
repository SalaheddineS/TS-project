import User from "../Models/User";
import { City_Enum } from "../../Enums/City_Enum";
import { gender_Enum } from "../../Enums/Gender_Enum";
import { Request, Response } from "express";
import { CreateCart } from "./CartController";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RequestWithUser } from "../../Overriden_Interfaces/RequestWithUser";
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createUser = async (req: RequestWithUser, res: Response) => {
  const admin = req.user;
  const user = req.body;
  if (user.isAdmin && !admin.isAdmin) {
    return res
      .status(400)
      .json({ message: "You need to be an Admin to add a new Admin" });
  }
  if (await User.findOne({ email: user.email })) {
    return res.status(400).json({ message: "User already exists" });
  }
  if (!(user.city in City_Enum)) {
    return res.status(400).json({ message: "City not found" });
  }
  if (!(user.gender in gender_Enum)) {
    return res.status(400).json({ message: "Wrong gender" });
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  const newUser: any = new User(user);
  if (!newUser["image"]) {
    newUser.image =
      "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png";
  }

  try {
    await newUser.save().then((user: any) => {
      CreateCart(req, res, user._id); // Create Cart Simultaneously when creating user
    });

    res.status(201).json("Nouvel utilisateur crée avec succès");
  } catch (err: any) {
    res.status(400).json({ Erreur: "Erreur Du server" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
    if (req.body.name != null) {
      user.name = req.body.name;
    }
    if (req.body.lastname != null) {
      user.lastname = req.body.lastname;
    }
    if (req.body.email != null) {
      user.email = req.body.email;
    }
    if (req.body.city != null) {
      user.city = req.body.city;
    }
    if (req.body.address != null) {
      user.address = req.body.address;
    }
    if (req.body.phone != null) {
      user.phone = req.body.phone;
    }
    if (req.body.password != null) {
      user.password = req.body.password;
    }
    if (req.body.isSeller != null) {
      user.isSeller = req.body.isSeller;
    }

    if (req.body.isAdmin != null) {
      user.isAdmin = req.body.isAdmin;
    }
    if (req.body.image != null) {
      user.image = req.body.image;
    }
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.remove();
    res.json({ message: "User deleted" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUserByEmail = async (req: Request, res: Response) => {
  const email = req.params.email;
  try {
    User.findOne({ email: email }).remove().exec();
    res.json({ message: "User with the email: " + email + " is deleted" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
