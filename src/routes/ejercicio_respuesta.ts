import { Router } from "express";
import { controladorER } from "../controllers/ejercicio_respuesta";

const routerER = Router();

routerER.get("/", controladorER.getEjerciciosRespuestas);
routerER.get(
  "/:id_ejercicio/:id_respuesta",
  controladorER.getEjercicioRespuestabyID
);
routerER.get("/:id_ejercicio", controladorER.getRespuestasByEjercicio);
routerER.post("/", controladorER.asignarRespuesta);
routerER.delete(
  "/:id_ejercicio",
  controladorER.deleteEjercicioRespuestasByEjercicio
);

export default routerER;
