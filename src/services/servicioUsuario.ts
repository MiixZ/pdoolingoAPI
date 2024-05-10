import { Usuario } from "../models/usuario";
import db from "../database/database";

class servicioUsuario {
  async getAllUsers(): Promise<Usuario[]> {
    const usuarios = await db.query("SELECT * FROM USUARIOS");

    return usuarios as Usuario[];
  }
}

export default new servicioUsuario();
