import { Router } from "express";
import { controladorRespuesta } from "../controllers/respuesta";

const routerRespuesta = Router();

routerRespuesta.get("/", controladorRespuesta.getRespuestas);
routerRespuesta.get("/:id", controladorRespuesta.getRespuestaByID);
routerRespuesta.get("/texto/:texto", controladorRespuesta.getRespuestaByTexto);
routerRespuesta.post("/", controladorRespuesta.createRespuesta);
routerRespuesta.put("/:id", controladorRespuesta.updateRespuesta);
routerRespuesta.delete("/:id", controladorRespuesta.deleteRespuesta);

export default routerRespuesta;
