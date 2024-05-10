import { Router } from "express";
import routerUsuario from "./usuarioR";

const router = Router();

router.use("/usuarios", routerUsuario);

export default router;
