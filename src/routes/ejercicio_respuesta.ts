import { Router } from "express";
import { controladorER } from "../controllers/ejercicio_respuesta";

const routerER = Router();

routerER.get("/", controladorER.getEjerciciosRespuestas);
routerER.get(
  "/:id_ejercicio/:id_respuesta",
  controladorER.getEjercicioRespuestabyID
);
routerER.post("/", controladorER.asignarRespuesta);

export default routerER;
