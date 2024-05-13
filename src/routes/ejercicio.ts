import { Router } from "express";
import controladorEjercicio from "../controllers/ejercicio";
import router from "./router";

const routerEjercicio = Router();

routerEjercicio.get("/", controladorEjercicio.getEjercicios);
routerEjercicio.get("/:id", controladorEjercicio.getEjerciciobyID);
routerEjercicio.post("/", controladorEjercicio.createEjercicio);
routerEjercicio.put("/:id", controladorEjercicio.updateEjercicio);
routerEjercicio.delete("/:id", controladorEjercicio.deleteEjercicio);

export default routerEjercicio;
