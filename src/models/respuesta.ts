import db from "../database/database";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface Respuesta {
  id: number;
  texto: string;
  correcta?: boolean;
}

export class RespuestaModel {
  static async getRespuestas(): Promise<Respuesta[]> {
    const respuestas = await db.query<RowDataPacket[]>(
      "SELECT * FROM RESPUESTAS"
    );

    return respuestas as Respuesta[];
  }

  static async getRespuestaByID(id: number): Promise<Respuesta> {
    const respuesta = await db.query<RowDataPacket[]>(
      "SELECT * FROM RESPUESTAS WHERE ID = ?",
      [id]
    );

    return respuesta[0] as Respuesta;
  }

  static async getRespuestaByTexto(texto: string): Promise<Respuesta | null> {
    const respuestas = await db.query<RowDataPacket[]>(
      "SELECT * FROM RESPUESTAS WHERE TEXTO = ?",
      [texto]
    );

    return respuestas[0] ? (respuestas[0] as Respuesta) : null;
  }

  static async createRespuesta(data: Respuesta): Promise<Respuesta | null> {
    const result = await db.query<ResultSetHeader>(
      "INSERT INTO RESPUESTAS SET ?",
      [data]
    );

    if (result.insertId) {
      return this.getRespuestaByID(result.insertId);
    }

    return null;
  }

  static async updateRespuesta(
    id: number,
    data: Respuesta
  ): Promise<Respuesta | null> {
    const result = await db.query<ResultSetHeader>(
      "UPDATE RESPUESTAS SET ? WHERE ID = ?",
      [data, id]
    );

    if (result.affectedRows) {
      return this.getRespuestaByID(id);
    }

    return null;
  }

  static async deleteRespuesta(id: number): Promise<boolean> {
    const result = await db.query<ResultSetHeader>(
      "DELETE FROM RESPUESTAS WHERE ID = ?",
      [id]
    );

    return result.affectedRows > 0;
  }
}
