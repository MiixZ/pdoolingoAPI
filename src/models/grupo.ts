import db from "../database/database";
import { ResultSetHeader, RowDataPacket } from "mysql2";

interface Grupo {
  id: number;
  codigo: string;
}

export class GrupoModel {
  static async getGrupos(): Promise<Grupo[]> {
    const grupos = await db.query<RowDataPacket[]>("SELECT * FROM GRUPOS");

    return grupos as Grupo[];
  }

  static async getGrupoByID(id: number): Promise<Grupo | null> {
    const grupo = await db.query<RowDataPacket[]>(
      "SELECT * FROM GRUPOS WHERE ID = ?",
      id
    );

    if (Array.isArray(grupo) && grupo.length > 0) {
      return grupo[0] as Grupo;
    }

    return null;
  }

  static async createGrupo(data: Grupo): Promise<Grupo | null> {
    const result = await db.query<ResultSetHeader>(
      "INSERT INTO GRUPOS SET ?",
      data
    );

    if (result.insertId) {
      return this.getGrupoByID(result.insertId);
    }

    return null;
  }

  static async updateGrupo(id: number, data: Grupo): Promise<Grupo | null> {
    const result = await db.query<ResultSetHeader>(
      "UPDATE GRUPOS SET ? WHERE ID = ?",
      [data, id]
    );

    if (result.affectedRows > 0) {
      return this.getGrupoByID(id);
    }

    return null;
  }

  static async deleteGrupo(id: number): Promise<boolean> {
    const result = await db.query<ResultSetHeader>(
      "DELETE FROM GRUPOS WHERE ID = ?",
      id
    );

    return result.affectedRows > 0;
  }
}
