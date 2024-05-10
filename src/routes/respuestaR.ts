import { Router } from "express";
import controladorRespuesta from "../controllers/respuestaC";

const routerRespuesta = Router();

routerRespuesta.get("/", controladorRespuesta.getRespuestas);

export default routerRespuesta;
