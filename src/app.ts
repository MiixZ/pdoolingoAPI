import express, { Request, Response } from "express";
import cors from "cors";
import router from "./routes/router";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());

// Rutas
app.get("/", async (req: Request, res: Response) => {
  res.send("¡Hola, mundo!");
});

app.use("/", router);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`La API está escuchando en http://localhost:${port}`);
});
