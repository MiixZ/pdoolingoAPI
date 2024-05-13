import { Router } from "express";
import controladorUsuario from "../controllers/usuario";

const routerUsuario = Router();

routerUsuario.get("/", controladorUsuario.getUsuarios);

export default routerUsuario;
