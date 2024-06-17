import { Router } from "express";
import { controladorGrupo } from "../controllers/grupo";

const routerGrupo = Router();

routerGrupo.get("/", controladorGrupo.getGrupos);
routerGrupo.get("/:id", controladorGrupo.getGrupobyID);

routerGrupo.post("/", controladorGrupo.createGrupo);

routerGrupo.put("/:id", controladorGrupo.updateGrupo);

routerGrupo.delete("/:id", controladorGrupo.deleteGrupo);

export default routerGrupo;
