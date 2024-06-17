import db from "../database/database";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { v4 as uuidv4 } from "uuid";

interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  DNI: DNI;
  vidas: number;
  tipo: TipoUsuario;
  grupo: number;
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

  static async getUsuarioByID(id: string): Promise<Usuario | null> {
    const usuario = await db.query<RowDataPacket[]>(
      "SELECT * FROM USUARIOS WHERE ID = ?",
      id
    );

    if (Array.isArray(usuario) && usuario.length > 0) {
      return usuario[0] as Usuario;
    }

    return null;
  }

  static async getUsuarioByEmail(email: string): Promise<Usuario[] | null> {
    const usuarios = await db.query<RowDataPacket[]>(
      "SELECT * FROM USUARIOS WHERE EMAIL = ?",
      [email]
    );

    if (Array.isArray(usuarios) && usuarios.length > 0) {
      return usuarios as Usuario[];
    }

    return null;
  }

  static async getUsuarioByDNI(dni: DNI): Promise<Usuario | null> {
    const usuario = await db.query<RowDataPacket[]>(
      "SELECT * FROM USUARIOS WHERE DNI = ?",
      dni
    );

    if (Array.isArray(usuario) && usuario.length > 0) {
      return usuario[0] as Usuario;
    }

    return null;
  }

  static async getUsuariosByGrupo(grupo: number): Promise<Usuario[]> {
    const usuarios = await db.query<RowDataPacket[]>(
      "SELECT * FROM USUARIOS WHERE GRUPO = ?",
      grupo
    );

    return usuarios as Usuario[];
  }

  static async createUsuario(data: Usuario): Promise<Usuario | null> {
    const id = uuidv4();
    data.id = id;

    const result = await db.query<ResultSetHeader>(
      "INSERT INTO USUARIOS SET ?",
      data
    );

    if (result) {
      return this.getUsuarioByID(id);
    }

    return null;
  }

  static async updateUsuario(
    id: string,
    data: Usuario
  ): Promise<Usuario | null> {
    const result = await db.query<ResultSetHeader>(
      "UPDATE USUARIOS SET ? WHERE ID = ?",
      [data, id]
    );

    if (result.affectedRows > 0) {
      return this.getUsuarioByID(id);
    }

    return null;
  }

  static async deleteUsuario(id: string): Promise<boolean> {
    const result = await db.query<ResultSetHeader>(
      "DELETE FROM USUARIOS WHERE ID = ?",
      id
    );

    return result.affectedRows > 0;
  }
}
