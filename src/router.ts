import { Router } from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputsError } from "./middleware";

const router = Router();

// Routing

router.get("/", getProducts);

router.get(
  "/:id",
  param("id").isInt().withMessage("Id no válido"),
  handleInputsError,
  getProductById
);

router.post(
  "/",
  // Validación
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no puede ser un campo vacío"),

  body("price")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("El precio del producto no puede ser un campo vacío")
    .custom((value) => value > 0)
    .withMessage("Valor no válido"),

  handleInputsError,
  createProduct
);

router.put(
  "/:id",
  // Validación
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no puede ser un campo vacío"),

  body("price")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("El precio del producto no puede ser un campo vacío")
    .custom((value) => value > 0)
    .withMessage("Valor no válido"),

  body("availability")
    .isBoolean()
    .withMessage("Valor pra disponibilidad no válido"),

  handleInputsError,
  updateProduct
);

router.patch("/", (req, res) => {
  res.json("desde patch");
});

router.delete("/", (req, res) => {
  res.json("desde delete");
});

export default router;
