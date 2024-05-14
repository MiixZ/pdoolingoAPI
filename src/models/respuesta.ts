import db from "../database/database";
import { RowDataPacket } from "mysql2";

interface Respuesta {
  id: number;
  texto: string;
}

export class RespuestaModel {
  static async getRespuestas(): Promise<Respuesta[]> {
    const respuestas = await db.query<RowDataPacket[]>(
      "SELECT * FROM RESPUESTAS"
    );

    return respuestas as Respuesta[];
  }
}
