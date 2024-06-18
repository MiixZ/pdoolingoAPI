import { Router } from "express";
import { controladorUsuario } from "../controllers/usuario";
import router from "./router";
import multer from "multer";

const routerUsuario = Router();
const upload = multer({ dest: "uploads/" });

routerUsuario.get("/", controladorUsuario.getUsuarios);
routerUsuario.get("/:id", controladorUsuario.getUsuarioByID);
routerUsuario.get("/grupo/:grupo", controladorUsuario.getUsuariosByGrupo);

routerUsuario.post("/", controladorUsuario.createUsuario);
routerUsuario.post("/nombre", controladorUsuario.getUsuariosBySesion);
routerUsuario.post("/dni", controladorUsuario.getUsuarioByDNI);

routerUsuario.post(
  "/loadCSV",
  upload.single("csvFile"),
  controladorUsuario.loadCSV
);

routerUsuario.put("/:id", controladorUsuario.updateUsuario);

routerUsuario.delete("/:id", controladorUsuario.deleteUsuario);

export default routerUsuario;
