import { Router } from "express";
import controladorEjercicio from "../controllers/ejercicio";

const routerEjercicio = Router();

routerEjercicio.get("/", controladorEjercicio.getEjercicios);
routerEjercicio.get("/:id", controladorEjercicio.getEjerciciobyID);
routerEjercicio.post("/", controladorEjercicio.createEjercicio);

export default routerEjercicio;
