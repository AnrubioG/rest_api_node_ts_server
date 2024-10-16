import express from "express";
import router from "./router";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import db from "./config/db";

// conexion a la base de datos
async function connectDB() {
  await db.authenticate();
  db.sync();
}

connectDB();

// Instancia de express
const server = express();
// leer datos de formularios
server.use(express.json());
server.use("/api/products", router);

// Docs
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default server;
