import { Router } from "express";
import controladorUE from "../controllers/usuario_ejercicio";

const routerUE = Router();

routerUE.get("/", controladorUE.getUsuarioEjercicios);

export default routerUE;
