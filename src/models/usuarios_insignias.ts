import db from "../database/database";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface usuario_insignia {
  id_usuario: string;
  id_insignia: number;
}

export class UIModel {
  static async getUsuarioInsignias(): Promise<usuario_insignia[]> {
    const usu_insig = await db.query<RowDataPacket[]>(
      "SELECT * FROM USUARIOS_INSIGNIAS"
    );

    return usu_insig as usuario_insignia[];
  }

  static async getUsuarioInsigniaByID(
    id_usuario: string,
    id_insignia: number
  ): Promise<usuario_insignia | null> {
    const usu_insig = await db.query<RowDataPacket[]>(
      "SELECT * FROM USUARIOS_INSIGNIAS WHERE ID_USUARIO = ? AND ID_INSIGNIA = ?",
      [id_usuario, id_insignia]
    );

    if (Array.isArray(usu_insig) && usu_insig.length > 0) {
      return usu_insig[0] as usuario_insignia;
    }

    return null;
  }

  static async getInsigniasByUsuario(
    id_usuario: string
  ): Promise<usuario_insignia[]> {
    const insignias = await db.query<RowDataPacket[]>(
      "SELECT * FROM USUARIOS_INSIGNIAS WHERE ID_USUARIO = ?",
      [id_usuario]
    );

    return insignias as usuario_insignia[];
  }

  static async asignarInsignia(
    id_usuario: string,
    id_insignia: number
  ): Promise<usuario_insignia | null> {
    const usuarioInsigniaExistente = await db.query<RowDataPacket[]>(
      "SELECT * FROM USUARIOS_INSIGNIAS WHERE ID_USUARIO = ? AND ID_INSIGNIA = ?",
      [id_usuario, id_insignia]
    );

    if (
      Array.isArray(usuarioInsigniaExistente) &&
      usuarioInsigniaExistente.length > 0
    ) {
      return null;
    }

    const result = await db.query<ResultSetHeader>(
      "INSERT INTO USUARIOS_INSIGNIAS (ID_USUARIO, ID_INSIGNIA) VALUES (?, ?)",
      [id_usuario, id_insignia]
    );

    if (result.affectedRows > 0) {
      return { id_usuario, id_insignia };
    }

    return null;
  }

  static async desasignarInsignia(
    id_usuario: string,
    id_insignia: number
  ): Promise<boolean> {
    const result = await db.query<ResultSetHeader>(
      "DELETE FROM USUARIOS_INSIGNIAS WHERE ID_USUARIO = ? AND ID_INSIGNIA = ?",
      [id_usuario, id_insignia]
    );

    return result.affectedRows > 0;
  }

  static async desasignarInsigniasByUsuario(
    id_usuario: string
  ): Promise<boolean> {
    const result = await db.query<ResultSetHeader>(
      "DELETE FROM USUARIOS_INSIGNIAS WHERE ID_USUARIO = ?",
      [id_usuario]
    );

    return result.affectedRows > 0;
  }

  static async desasignarInsigniasByInsignia(
    id_insignia: number
  ): Promise<boolean> {
    const result = await db.query<ResultSetHeader>(
      "DELETE FROM USUARIOS_INSIGNIAS WHERE ID_INSIGNIA = ?",
      [id_insignia]
    );

    return result.affectedRows > 0;
  }
}
