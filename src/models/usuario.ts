import db from "../database/database";
import { RowDataPacket } from "mysql2";

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  contrasena: string;
  DNI: DNI;
  vidas: number;
  tipo: TipoUsuario;
}

interface DNI {
  numero: number;
  letra: string;
}

enum TipoUsuario {
  Estudiante = "estudiante",
  Profesor = "profesor",
  Administrador = "admin",
}

export class usuarioModel {
  static async getUsuarios(): Promise<Usuario[]> {
    const usuarios = await db.query<RowDataPacket[]>("SELECT * FROM USUARIOS");

    return usuarios as Usuario[];
  }
}
