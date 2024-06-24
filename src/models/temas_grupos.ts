import db from "../database/database";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface temas_grupos {
  id_tema: number;
  id_grupo: number;
  bloqueado: boolean;
}

export class TGModel {
  static async getTemasGrupos(): Promise<temas_grupos[]> {
    const temas_grupos = await db.query<RowDataPacket[]>(
      "SELECT * FROM TEMAS_GRUPOS"
    );

    return temas_grupos as temas_grupos[];
  }

  static async getTemaGrupoByID(
    id_tema: number,
    id_grupo: number
  ): Promise<temas_grupos | null> {
    const tema_grupo = await db.query<RowDataPacket[]>(
      "SELECT * FROM TEMAS_GRUPOS WHERE ID_TEMA = ? AND ID_GRUPO = ?",
      [id_tema, id_grupo]
    );

    if (Array.isArray(tema_grupo) && tema_grupo.length > 0) {
      return tema_grupo[0] as temas_grupos;
    }

    return null;
  }

  static async getTemasByGrupo(id_grupo: number): Promise<temas_grupos[]> {
    const temas = await db.query<RowDataPacket[]>(
      "SELECT * FROM TEMAS_GRUPOS WHERE ID_GRUPO = ?",
      [id_grupo]
    );

    return temas as temas_grupos[];
  }

  static async getGruposByTema(id_tema: number): Promise<temas_grupos[]> {
    const grupos = await db.query<RowDataPacket[]>(
      "SELECT * FROM TEMAS_GRUPOS WHERE ID_TEMA = ?",
      [id_tema]
    );

    return grupos as temas_grupos[];
  }

  static async updateBloqueo(
    id_tema: number,
    id_grupo: number,
    bloqueado: boolean
  ): Promise<temas_grupos | null> {
    const result = await db.query<ResultSetHeader>(
      "UPDATE TEMAS_GRUPOS SET BLOQUEADO = ? WHERE ID_TEMA = ? AND ID_GRUPO = ?",
      [bloqueado, id_tema, id_grupo]
    );

    if (result.affectedRows > 0) {
      return this.getTemaGrupoByID(id_tema, id_grupo);
    }
    return null;
  }

  static async asignarTema(
    id_tema: number,
    id_grupo: number,
    bloqueado: boolean
  ): Promise<temas_grupos | null> {
    const result = await db.query<ResultSetHeader>(
      "INSERT INTO TEMAS_GRUPOS (ID_TEMA, ID_GRUPO, BLOQUEADO) VALUES (?, ?, ?)",
      [id_tema, id_grupo, bloqueado]
    );

    if (result.insertId) {
      return this.getTemaGrupoByID(id_tema, id_grupo);
    }

    return null;
  }

  static async desasignarTema(
    id_tema: number,
    id_grupo: number
  ): Promise<boolean> {
    const result = await db.query<ResultSetHeader>(
      "DELETE FROM TEMAS_GRUPOS WHERE ID_TEMA = ? AND ID_GRUPO = ?",
      [id_tema, id_grupo]
    );

    return result.affectedRows > 0;
  }

  static async desasignarTemasByGrupo(id_grupo: number): Promise<boolean> {
    const result = await db.query<ResultSetHeader>(
      "DELETE FROM TEMAS_GRUPOS WHERE ID_GRUPO = ?",
      [id_grupo]
    );

    return result.affectedRows > 0;
  }

  static async desasignarGruposByTema(id_tema: number): Promise<boolean> {
    const result = await db.query<ResultSetHeader>(
      "DELETE FROM TEMAS_GRUPOS WHERE ID_TEMA = ?",
      [id_tema]
    );

    return result.affectedRows > 0;
  }
}
