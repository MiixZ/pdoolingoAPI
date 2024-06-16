import db from "../database/database";
import { ResultSetHeader, RowDataPacket } from "mysql2";

interface Tema {
  id: number;
  titulo: string;
  descripcion: string;
  n_tema?: number;
}

export class TemaModel {
  static async getTemas(): Promise<Tema[]> {
    const temas = await db.query<RowDataPacket[]>("SELECT * FROM TEMAS");

    return temas as Tema[];
  }

  static async getTemaByID(id: number): Promise<Tema | null> {
    const tema = await db.query<RowDataPacket[]>(
      "SELECT * FROM TEMAS WHERE ID = ?",
      id
    );

    if (Array.isArray(tema) && tema.length > 0) {
      return tema[0] as Tema;
    }

    return null;
  }

  static async createTema(data: Tema): Promise<Tema | null> {
    const result = await db.query<ResultSetHeader>(
      "INSERT INTO TEMAS SET ?",
      data
    );

    if (result.affectedRows > 0) {
      return { ...data, id: result.insertId };
    }

    return null;
  }

  static async updateTema(id: number, data: Tema): Promise<Tema | null> {
    const result = await db.query<ResultSetHeader>(
      "UPDATE TEMAS SET ? WHERE ID = ?",
      [data, id]
    );

    if (result.affectedRows > 0) {
      return { ...data, id };
    }

    return null;
  }

  static async deleteTema(id: number): Promise<boolean> {
    const result = await db.query<ResultSetHeader>(
      "DELETE FROM TEMAS WHERE ID = ?",
      id
    );

    return result.affectedRows > 0;
  }
}
