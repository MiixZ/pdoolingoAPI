import { Router } from "express";
import routerUsuario from "./usuarioR";
import routerEjercicio from "./ejercicioR";
import routerRespuesta from "./respuestaR";
import routerUE from "./usuario_ejercicioR";
import routerER from "./ejercicio_respuestaR";

const router = Router();

router.use("/usuarios", routerUsuario);
router.use("/ejercicios", routerEjercicio);
router.use("/respuestas", routerRespuesta);
router.use("/usuario-ejercicios", routerUE);
router.use("/ejercicio-respuestas", routerER);

export default router;
