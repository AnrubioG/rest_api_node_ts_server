import express from "express";
import colors from "colors";
import router from "./router";
import db from "./config/db";

// conexion a la base de datos
async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.blue.bold("Conexion exitosa a la base de datos"));
  } catch (error) {
    console.log(
      colors.red.bold("Hubo un error en la conexion con la base de datos")
    );
    console.log(error);
  }
}

connectDB();

// Instancia de express
const server = express();
server.use(express.json());
server.use("/api/products", router);

export default server;
