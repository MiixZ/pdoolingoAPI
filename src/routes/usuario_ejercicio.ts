import { Router } from "express";
import { controladorUE } from "../controllers/usuario_ejercicio";

const routerUE = Router();

routerUE.get("/", controladorUE.getUsuarioEjercicios);
routerUE.get(
  "/:id_usuario/:id_ejercicio",
  controladorUE.getUsuarioEjercicioByID
);
routerUE.get("/:id_usuario", controladorUE.getEjerciciosByUsuario);
routerUE.get(
  "/temas/:id_usuario/:id_tema",
  controladorUE.getEjerciciosTemaByUsuario
);

routerUE.post("/", controladorUE.asignarEjercicio);

routerUE.delete(
  "/:id_usuario/:id_ejercicio",
  controladorUE.desasignarEjercicio
);
routerUE.delete(
  "/:id_ejercicio",
  controladorUE.desasignarEjerciciosByEjercicio
);
routerUE.delete(
  "/delete/usuario/:id_usuario",
  controladorUE.desasignarEjerciciosByUsuario
);

export default routerUE;
