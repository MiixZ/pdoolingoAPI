import { Router } from "express";
import controladorRespuesta from "../controllers/respuesta";

const routerRespuesta = Router();

routerRespuesta.get("/", controladorRespuesta.getRespuestas);

export default routerRespuesta;
