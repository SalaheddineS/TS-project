import User from "../Models/User";
import { Request, Response } from "express";
import { IUser } from "../Models/Interfaces/IUser";

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
  const user: IUser = req.body;
  const newUser = new User(user);
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
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
    if (req.body.role != null) {
      user.role = req.body.role;
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