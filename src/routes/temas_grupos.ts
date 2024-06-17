import { Router } from "express";
import { controladorTG } from "../controllers/temas_grupos";

const routerTG = Router();

routerTG.get("/", controladorTG.getTemasGrupos);
routerTG.get("/:id_tema/:id_grupo", controladorTG.getTemasGrupobyID);
routerTG.get("/grupo/:id_grupo", controladorTG.getTemaByGrupo);
routerTG.get("/tema/:id_tema", controladorTG.getGrupoByTema);

routerTG.post("/", controladorTG.asignarTema);

routerTG.put("/", controladorTG.updateBloqueo);

routerTG.delete("/grupos/:id_tema", controladorTG.desasignarGruposByTema);
routerTG.delete("/temas/:id_grupo", controladorTG.desasignarTemasByGrupo);

export default routerTG;
