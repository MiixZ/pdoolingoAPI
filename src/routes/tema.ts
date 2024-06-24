import { Router } from "express";
import { controladorTema } from "../controllers/tema";

const routerTema = Router();

routerTema.get("/", controladorTema.getTemas);
routerTema.get("/:id", controladorTema.getTemabyID);

routerTema.post("/", controladorTema.createTema);

routerTema.put("/:id", controladorTema.updateTema);

routerTema.delete("/:id", controladorTema.deleteTema);

export default routerTema;
