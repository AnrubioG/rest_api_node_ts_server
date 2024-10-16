import { Request, Response } from "express";
import Product from "../models/Product.model";
import colors from "colors";

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt", "availability"],
    },
  });
  res.json({ data: products });
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    res.status(404).json({
      error: "Producto no encontrado",
    });
    return;
  }

  res.json({ data: product });
};

export const createProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  // Validar si el producto existe
  if (!product) {
    res.status(404).json({
      error: "Producto no encontrado",
    });
    return;
  }
  await product.update(req.body);
  await product.save();
  res.json({ data: product });
};

export const updateavailability = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  // Validar si el producto existe
  if (!product) {
    res.status(404).json({
      error: "Producto no encontrado",
    });
    return;
  }

  // Actualizar
  product.availability = !product.dataValues.availability;
  await product.save();
  res.json({ data: product });
};

export const deletProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  // Validar si el producto existe
  if (!product) {
    res.status(404).json({
      error: "Producto no encontrado",
    });
    return;
  }

  await product.destroy();
  res.json({ data: "Producto Eliminado" });
};
