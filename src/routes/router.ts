import { Router } from "express";
import routerUsuario from "./usuario";
import routerEjercicio from "./ejercicio";
import routerRespuesta from "./respuesta";
import routerUE from "./usuario_ejercicio";
import routerER from "./ejercicio_respuesta";
import routerInsignia from "./insignia";
import routerTema from "./tema";
import routerUI from "./usuarios_insignias";

const router = Router();

router.use("/usuarios", routerUsuario);
router.use("/ejercicios", routerEjercicio);
router.use("/respuestas", routerRespuesta);
router.use("/usuario-ejercicios", routerUE);
router.use("/ejercicios-respuestas", routerER);
router.use("/insignias", routerInsignia);
router.use("/temas", routerTema);
router.use("/usuarios-insignias", routerUI);

export default router;
