import { Router } from "express";
import { controladorUI } from "../controllers/usuarios_insignias";

const routerUI = Router();

routerUI.get("/", controladorUI.getUsuarioInsignias);
routerUI.get("/:id_usuario/:id_insignia", controladorUI.getUsuarioInsigniaByID);
routerUI.get("/:id_usuario", controladorUI.getInsigniasByUsuario);

routerUI.post("/", controladorUI.asignarInsignia);

routerUI.delete("/:id_usuario/:id_insignia", controladorUI.desasignarInsignia);
routerUI.delete("/:id_usuario", controladorUI.desasignarInsigniasByUsuario);
routerUI.delete(
  "/insignia/delete/:id_insignia",
  controladorUI.desasignarInsigniasByInsignia
);

export default routerUI;
