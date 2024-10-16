import { Router } from "express";
import {
  createProduct,
  deletProduct,
  getProductById,
  getProducts,
  updateavailability,
  updateProduct,
} from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputsError } from "./middleware";

const router = Router();

/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                   id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                   name:
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor curvo de 49 pulgadas
 *                   price:
 *                      type: number
 *                      description: The Product price
 *                      example: 300
 *                   availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true
 */

// Routing

/**
 * @swagger
 * /api/products:
 *      get:
 *        summary: Get a list of products
 *        tags:
 *            - Products
 *        descriptios: Return a list of productos
 *        responses:
 *                200:
 *                    description: Successful response
 *                    content:
 *                        application/json:
 *                              schema:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Product'
 */

router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *        summary: Get a product by ID
 *        tags:
 *            - Products
 *        descriptios: Return a product based on its unique ID
 *        parameters:
 *              - in: path
 *                name: id
 *                description: The ID of the product to retrieve
 *                required: true
 *                schema:
 *                    type: integer
 *        responses:
 *                200:
 *                    description: Successful response
 *                    content:
 *                        application/json:
 *                              schema:
 *                                   $ref: '#/components/schemas/Product'
 *                404:
 *                    description: Not found
 *                400:
 *                    description: Bad Request - Invalid ID
 */

router.get(
  "/:id",
  param("id").isInt().withMessage("Id no válido"),
  handleInputsError,
  getProductById
);

/**
 * @swagger
 * /api/products:
 *      post:
 *        summary: Create a new product
 *        tags:
 *            - Products
 *        description: Returns a new record in the database
 *        requestBody:
 *            required: true
 *            content:
 *                 application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor curvo de 49 pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 300
 *        responses:
 *                201:
 *                    description: Successful response
 *                    content:
 *                        application/json:
 *                              schema:
 *                                   $ref: '#/components/schemas/Product'
 *                400:
 *                  description: Bad Request - Invalid input data
 *
 */

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

/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *        summary: Updates a product whith user input
 *        tags:
 *            - Products
 *        description: Returns the updated product
 *        parameters:
 *              - in: path
 *                name: id
 *                description: The ID of the product to retrieve
 *                required: true
 *                schema:
 *                    type: integer
 *        requestBody:
 *            required: true
 *            content:
 *                 application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor curvo de 49 pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 300
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *        responses:
 *                200:
 *                    description: Successful response
 *                    content:
 *                        application/json:
 *                              schema:
 *                                   $ref: '#/components/schemas/Product'
 *                400:
 *                  description: Bad Request - Invalid ID or Invalid input data
 *                404:
 *                  description: Product Not Found
 *
 */

router.put(
  "/:id",
  // Validación
  param("id").isInt().withMessage("Id no válido"),
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

/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *        summary: Update product availability
 *        tags:
 *            - Products
 *        description: Returns the updated availability
 *        parameters:
 *              - in: path
 *                name: id
 *                description: The ID of the product to retrieve
 *                required: true
 *                schema:
 *                    type: integer
 *        responses:
 *                200:
 *                    description: Successful response
 *                    content:
 *                        application/json:
 *                              schema:
 *                                  type: string
 *                400:
 *                  description: Bad Request - Invalid ID
 *                404:
 *                  description: Product Not Found
 *
 */

router.patch(
  "/:id",
  param("id").isInt().withMessage("Id no válido"),
  handleInputsError,
  updateavailability
);

/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *        summary: Delete a product by  a given ID
 *        tags:
 *            - Products
 *        description: Return a confirmation massage
 *        parameters:
 *              - in: path
 *                name: id
 *                description: The ID of the product to delete
 *                required: true
 *                schema:
 *                    type: integer
 *        responses:
 *                200:
 *                    description: Successful response
 *                    content:
 *                        application/json:
 *                              schema:
 *                                  type: string
 *                                  value: "Producto eliminado"
 *                400:
 *                  description: Bad Request - Invalid ID
 *                404:
 *                  description: Product Not Found
 *
 */

router.delete(
  "/:id",
  param("id").isInt().withMessage("Id no válido"),
  handleInputsError,
  deletProduct
);

export default router;
