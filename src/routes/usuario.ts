import { Router } from "express";
import { controladorUsuario } from "../controllers/usuario";

const routerUsuario = Router();

routerUsuario.get("/", controladorUsuario.getUsuarios);
routerUsuario.get("/:id", controladorUsuario.getUsuarioByID);
routerUsuario.post("/", controladorUsuario.createUsuario);
routerUsuario.put("/:id", controladorUsuario.updateUsuario);
routerUsuario.delete("/:id", controladorUsuario.deleteUsuario);

export default routerUsuario;
