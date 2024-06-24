import express, { Request, Response } from "express";
import cors from "cors";
import router from "./routes/router";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());

// Configura multer para almacenar archivos en un directorio temporal
const upload = multer({ dest: "uploads/" });

app.use("/", router);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`La API está escuchando en http://localhost:${port}`);
});
