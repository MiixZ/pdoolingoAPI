import { Router } from "express";
import routerUsuario from "./usuario";
import routerEjercicio from "./ejercicio";
import routerRespuesta from "./respuesta";
import routerUE from "./usuario_ejercicio";
import routerER from "./ejercicio_respuesta";

const router = Router();

router.use("/usuarios", routerUsuario);
router.use("/ejercicios", routerEjercicio);
router.use("/respuestas", routerRespuesta);
router.use("/usuario-ejercicios", routerUE);
router.use("/ejercicios-respuestas", routerER);

export default router;
