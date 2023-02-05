import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../Models/User";
import Cart from "../Models/Cart";
import Product from "../Models/Product";

export const addToCart = async (req: Request, res: Response) => {
  const decoded = jwt.decode(req.cookies.token) as { id: string };
  const user = await User.findById(decoded.id);
  if (!user) return res.status(400).json({ message: "User not found" });
  let cart = await Cart.findOne({ user: user?._id });
  if (!cart) return res.status(400).json({ message: "Cart not found" });
  const { productId, quantity } = req.body;
  if (!productId || !quantity)
    return res
      .status(400)
      .json({ message: "Product id and quantity are required" });
  if (quantity < 1)
    return res.status(400).json({ message: "Quantity must be greater than 0" });
  const product = Product.findById(productId);
  if (!product) return res.status(400).json({ message: "Product not found" });
  cart = cart.products.where("_id").equals(productId);
  if (cart) {
    cart.quantity += quantity;
  } else {
    cart.products.push({ product: productId, quantity });
  }
  await cart.save();
  return res.status(200).json({ message: "Product added to cart" });
};

export const viewCart = async (req: Request, res: Response) => {
  const decoded = jwt.decode(req.cookies.token) as { id: string };
  const user = await User.findById(decoded.id);
  if (!user) return res.status(400).json({ message: "User not found" });
  const cart = await Cart.findOne({ user: user?._id }).populate("products.product");
  if (!cart) return res.status(400).json({ message: "Cart not found" });
  return res.status(200).json({ cart });
};

export const viewCarts = async (req: Request, res: Response) => {
    const carts = await Cart.find();
    return res.status(200).json({ carts });
    };
