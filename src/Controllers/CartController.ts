import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../Models/User";
import Cart from "../Models/Cart";
import Product from "../Models/Product";

export const addToCart = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;

  try {
    const decoded = jwt.decode(req.cookies.token) as { id: string };
    const user = await User.findById(decoded.id);
    if (!productId)
      return res.status(400).json({ message: "Product id is required" });
    if (quantity < 1)
      return res
        .status(400)
        .json({ message: "Quantity must be greater than 0" });
    const cart = await Cart.findOne({ user: user?._id });
    const productExist = cart?.products.find(
      (p: any) => p.product.toString() === productId
    );
    if (productExist) {
      return res.status(200).json({ message: "Can't Add an existing product" });
    } else {
      cart?.products.push({ product: productId, quantity });
      await cart?.save();
      return res.status(200).json({ message: "Product Added to Cart" });
    }
  } catch (err) {
    return res.status(400).json({ message: "Error Occured While Adding Cart" });
  }
};

export const viewCart = async (req: Request, res: Response) => {
  const decoded = jwt.decode(req.cookies.token) as { id: string };
  const user = await User.findById(decoded.id);
  if (!user) return res.status(400).json({ message: "User not found" });
  const cart = await Cart.findOne({ user: user?._id }).populate(
    "products.product"
  );
  if (!cart) return res.status(400).json({ message: "Cart not found" });
  return res.status(200).json({ cart });
};

export const viewCarts = async (req: Request, res: Response) => {
  const carts = await Cart.find();
  return res.status(200).json({ carts });
};

export const CreateCart = async (req: Request, res: Response, id: any) => {
  const cart = new Cart({
    user: id,
  });
  await cart.save();
};

export const removefromCart = async (req: Request, res: Response) => {
  const decoded = jwt.decode(req.cookies.token) as { id: string };
  const user = await User.findById(decoded.id);
  if (!user) return res.status(400).json({ message: "User not found" });
  const cart = await Cart.findOne({ user: user?._id });
  if (!cart) return res.status(400).json({ message: "Cart not found" });
  const { productId } = req.body;
  if (!productId)
    return res.status(400).json({ message: "Product id is required" });
  cart.products.pull(productId);
  await cart.save();
  return res.status(200).json({ message: "Product removed from cart" });
};

export const updateCart = async (req: Request, res: Response) => {
  const decoded = jwt.decode(req.cookies.token) as { id: string };
  const user = await User.findById(decoded.id);
  if (!user) return res.status(400).json({ message: "User not found" });
  const cart = await Cart.findOne({ user: user?._id });
  if (!cart) return res.status(400).json({ message: "Cart not found" });
  const { productId, quantity } = req.body;
  if (!productId || !quantity)
    return res
      .status(400)
      .json({ message: "Product id and quantity are required" });
  if (quantity < 1)
    return res.status(400).json({ message: "Quantity must be greater than 0" });
  cart.products.where("_id").equals(productId).set({ quantity: quantity });
  await cart.save();
  return res.status(200).json({ message: "Cart updated" });
};

export const clearCart = async (req: Request, res: Response) => {
  const decoded = jwt.decode(req.cookies.token) as { id: string };
  const user = await User.findById(decoded.id);
  if (!user) return res.status(400).json({ message: "User not found" });
  const cart = await Cart.findOne({ user: user?._id });
  if (!cart) return res.status(400).json({ message: "Cart not found" });
  cart.products = [];
  await cart.save();
  return res.status(200).json({ message: "Cart cleared" });
};
