import express, { Request, Response } from "express";
import db from "./database/database";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());

// Rutas
app.get("/", async (req: Request, res: Response) => {
  //res.send("¡Hola, mundo!");
  const results = await db.query("SELECT * FROM USUARIOS_EJERCICIOS");
  res.json(results);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`La API está escuchando en http://localhost:${port}`);
});
