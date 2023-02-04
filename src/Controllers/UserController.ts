import User from "../Models/User";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
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

export const createUser = async (req: Request, res: Response) => {
  const user= req.body;
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  const newUser = new User(user);
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err: any) {
    res
      .status(400)
      .json({ Erreur: "Erreur Du server Ou Utilisateur Existant" });
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
