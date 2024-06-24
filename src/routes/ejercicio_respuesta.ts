import { Router } from "express";
import { controladorER } from "../controllers/ejercicio_respuesta";

const routerER = Router();

routerER.get("/", controladorER.getEjerciciosRespuestas);
routerER.get(
  "/:id_ejercicio/:id_respuesta",
  controladorER.getEjercicioRespuestabyID
);
routerER.get("/:id_ejercicio", controladorER.getRespuestasByEjercicio);
routerER.put(
  "/:id_ejercicio/:id_respuesta",
  controladorER.updateEjercicioRespuesta
);

routerER.put(
  "/:id_ejercicio/newRespuesta",
  controladorER.updateEjercicioRespuesta
);

routerER.post("/", controladorER.asignarRespuesta);

routerER.delete(
  "/:id_ejercicio",
  controladorER.deleteEjercicioRespuestasByEjercicio
);

routerER.delete(
  "/:id_ejercicio/:id_respuesta",
  controladorER.deleteEjercicioRespuesta
);

export default routerER;
