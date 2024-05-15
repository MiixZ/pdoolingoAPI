import { Router } from "express";
import { controladorUE } from "../controllers/usuario_ejercicio";

const routerUE = Router();

routerUE.get("/", controladorUE.getUsuarioEjercicios);
routerUE.get(
  "/:id_usuario/:id_ejercicio",
  controladorUE.getUsuarioEjercicioByID
);
routerUE.post("/", controladorUE.asignarEjercicio);

export default routerUE;
