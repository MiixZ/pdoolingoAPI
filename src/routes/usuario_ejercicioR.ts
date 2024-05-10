import { Router } from "express";
import controladorUsuarioEjercicios from "../controllers/usuario_ejercicioC";

const routerUE = Router();

routerUE.get("/", controladorUsuarioEjercicios.getUsuarioEjercicios);

export default routerUE;
