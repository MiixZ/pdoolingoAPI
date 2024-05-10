import { Router } from "express";
import controladorUsuario from "../controllers/usuarioC";

const routerUsuario = Router();

routerUsuario.get("/", controladorUsuario.getUsuarios);

export default routerUsuario;
