import { Router } from "express";
import { controladorUE } from "../controllers/usuario_ejercicio";

const routerUE = Router();

routerUE.get("/", controladorUE.getUsuarioEjercicios);
routerUE.get(
  "/:id_usuario/:id_ejercicio",
  controladorUE.getUsuarioEjercicioByID
);
routerUE.get("/:id_usuario", controladorUE.getEjerciciosByUsuario);

routerUE.post("/", controladorUE.asignarEjercicio);

routerUE.delete(
  "/:id_usuario/:id_ejercicio",
  controladorUE.desasignarEjercicio
);

export default routerUE;
