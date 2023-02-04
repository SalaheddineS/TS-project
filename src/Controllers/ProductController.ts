import Product from "../Models/Product";
import { Request, Response } from "express";
import { ProductCat_Enum } from "../../Enums/ProductCat_Enum";
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  if (
    !req.body.name ||
    !req.body.price ||
    !req.body.image ||
    !req.body.brand ||
    !req.body.category ||
    !req.body.countInStock ||
    !req.body.description ||
    !req.body.rating ||
    !req.body.numReviews
  )
    return res.status(400).json({ message: "Missing data" });
  if (!(req.body.category in ProductCat_Enum))
    return res.status(400).json({ message: "Category not found" });
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
  });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err: any) {
    res.status(400).json({ Erreur: "Erreur Du server" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (req.body.name != null) {
      product.name = req.body.name;
    }
    if (req.body.price != null) {
      product.price = req.body.price;
    }
    if (req.body.image != null) {
      product.image = req.body.image;
    }
    if (req.body.brand != null) {
      product.brand = req.body.brand;
    }
    if (req.body.category != null) {
      product.category = req.body.category;
    }
    if (req.body.countInStock != null) {
      product.countInStock = req.body.countInStock;
    }
    if (req.body.description != null) {
      product.description = req.body.description;
    }
    if (req.body.rating != null) {
      product.rating = req.body.rating;
    }
    if (req.body.numReviews != null) {
      product.numReviews = req.body.numReviews;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.remove();
    res.json({ message: "Product deleted" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteProductByName = async (req: Request, res: Response) => {
  Product.deleteOne({ name: req.params.name }, function (err: any) {
    if (err)
      return res.status(500).json({ Erreur: "Une Erreur s'est Produite" });
    res.json({ message: "Product deleted" });
  });
};
