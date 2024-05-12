import { Usuario } from "../models/usuario";
import db from "../database/database";
import { RowDataPacket } from "mysql2";

class servicioUsuario {
  async getUsuarios(): Promise<Usuario[]> {
    const usuarios = await db.query<RowDataPacket[]>("SELECT * FROM USUARIOS");

    return usuarios as Usuario[];
  }
}

export default new servicioUsuario();
