import { Router } from "express";
import controladorUsuarioEjercicios from "../controllers/usuario_ejercicio";

const routerUE = Router();

routerUE.get("/", controladorUsuarioEjercicios.getUsuarioEjercicios);

export default routerUE;
