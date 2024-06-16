import { Router } from "express";
import { controladorInsignia } from "../controllers/insignia";

const routerInsignia = Router();

routerInsignia.get("/", controladorInsignia.getInsignias);
routerInsignia.get("/:id", controladorInsignia.getInsigniabyID);
routerInsignia.get("/tema/:id_tema", controladorInsignia.getInsigniasByTema);

routerInsignia.post("/", controladorInsignia.createInsignia);

routerInsignia.put("/:id", controladorInsignia.updateInsignia);

routerInsignia.delete("/:id", controladorInsignia.deleteInsignia);
routerInsignia.delete(
  "/tema/:id_tema",
  controladorInsignia.deleteInsigniaByTema
);

export default routerInsignia;
