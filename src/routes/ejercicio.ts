import { Router } from "express";
import { controladorEjercicio } from "../controllers/ejercicio";

const routerEjercicio = Router();

routerEjercicio.get("/", controladorEjercicio.getEjercicios);
routerEjercicio.get("/:id", controladorEjercicio.getEjerciciobyID);
routerEjercicio.get("/tema/:n_tema", controladorEjercicio.getEjerciciosByTema);

routerEjercicio.post("/", controladorEjercicio.createEjercicio);

routerEjercicio.put("/:id", controladorEjercicio.updateEjercicio);

routerEjercicio.delete("/:id", controladorEjercicio.deleteEjercicio);

export default routerEjercicio;
