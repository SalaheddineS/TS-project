import Cart from "../Models/Cart";
import User from "../Models/User";
import { Request, Response } from "express";
import { RequestWithUser } from "../../Overriden_Interfaces/RequestWithUser";
import Order from "../Models/Order";

export const createOrder = async (req: RequestWithUser, res: Response) => {
  const { cartId, address, payment } = req.body;
  const cart = await Cart.findById(cartId).populate("user");
  if (!cart) return res.status(404).json({ message: "Cart not found" });
  if (cart.user._id.toString() == req.user._id.toString()) {
    return res.status(401).json({ message: "Not Authorized" });
  }
  const order = new Order({
    cart: cartId,
    address,
    payment,
  });
  const newOrder = await order.save();
  res.status(201).json(newOrder);
};

export const getOrders = async (req: Request, res: Response) => {
  const orders = await Order.find({}).populate("cart");
  res.status(200).json(orders);
};

export const getOrder = async (req: RequestWithUser, res: Response) => {
  const { id } = req.params;
  const order = await Order.findById(id)
    .populate({
      path: 'cart',
      model: 'Cart',
      populate: {
        path: 'products.product',
        model: 'Product'
      }
    })
  if (order.cart.user._id.toString() == req.user._id.toString() || req.user.isAdmin) {
    res.status(200).json(order);
  } else {
    res.status(401).json({ message: "Not Authorized" });
  }
};



const OrderController = {
  createOrder,
  getOrders,
  getOrder,
};

export default OrderController;
