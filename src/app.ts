import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());

// Rutas
app.get("/", (req: Request, res: Response) => {
  res.send("¡Hola, mundo!");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`La API está escuchando en http://localhost:${port}`);
});
