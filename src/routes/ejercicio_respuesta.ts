import { Router } from "express";
import controladorER from "../controllers/ejercicio_respuesta";

const routerER = Router();

routerER.get("/", controladorER.getEjerciciosRespuestas);

export default routerER;
