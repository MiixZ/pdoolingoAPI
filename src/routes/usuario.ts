import { Router } from "express";
import { controladorUsuario } from "../controllers/usuario";
import router from "./router";

const routerUsuario = Router();

routerUsuario.get("/", controladorUsuario.getUsuarios);
routerUsuario.get("/:id", controladorUsuario.getUsuarioByID);
routerUsuario.get("/grupo/:grupo", controladorUsuario.getUsuariosByGrupo);

routerUsuario.post("/", controladorUsuario.createUsuario);
routerUsuario.post("/nombre", controladorUsuario.getUsuariosBySesion);
routerUsuario.post("/dni", controladorUsuario.getUsuarioByDNI);

routerUsuario.put("/:id", controladorUsuario.updateUsuario);
routerUsuario.delete("/:id", controladorUsuario.deleteUsuario);

export default routerUsuario;
