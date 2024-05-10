import { Router } from "express";
import controladorEjercicio from "../controllers/ejercicioC";

const routerEjercicio = Router();

routerEjercicio.get("/", controladorEjercicio.getEjercicios);

export default routerEjercicio;
