import db from "../database/database";
import { RowDataPacket } from "mysql2";

interface ejercicio_respuesta {
  id_ejercicio: number;
  id_respuesta: number;
  es_correcta: boolean;
}

export class ERModel {
  static async getEjercicioRespuestas(): Promise<ejercicio_respuesta[]> {
    const ejercicio_respuestas = await db.query<RowDataPacket[]>(
      "SELECT * FROM EJERCICIOS_RESPUESTAS"
    );

    return ejercicio_respuestas as ejercicio_respuesta[];
  }
}
