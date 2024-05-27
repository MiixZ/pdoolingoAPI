import db from "../database/database";
import { ResultSetHeader, RowDataPacket } from "mysql2";

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

  static async getEjercicioRespuestaByID(
    id_ejercicio: number,
    id_respuesta: number
  ): Promise<ejercicio_respuesta | null> {
    const ejercicio_respuesta = await db.query<RowDataPacket[]>(
      "SELECT * FROM EJERCICIOS_RESPUESTAS WHERE ID_EJERCICIO = ? AND ID_RESPUESTA = ?",
      [id_ejercicio, id_respuesta]
    );

    if (Array.isArray(ejercicio_respuesta) && ejercicio_respuesta.length > 0) {
      return ejercicio_respuesta[0] as ejercicio_respuesta;
    }

    return null;
  }

  static async getRespuestasByEjercicio(
    id_ejercicio: number
  ): Promise<number[]> {
    const id_respuestas = await db.query<RowDataPacket[]>(
      "SELECT id_respuesta FROM EJERCICIOS_RESPUESTAS WHERE ID_EJERCICIO = ?",
      [id_ejercicio]
    );

    return id_respuestas as unknown as number[];
  }

  static async asignarRespuesta(
    id_ejercicio: number,
    id_respuesta: number,
    es_correcta: boolean
  ): Promise<ejercicio_respuesta | null> {
    const result = await db.query<ResultSetHeader>(
      "INSERT INTO EJERCICIOS_RESPUESTAS (ID_EJERCICIO, ID_RESPUESTA, ES_CORRECTA) VALUES (?, ?, ?)",
      [id_ejercicio, id_respuesta, es_correcta]
    );

    if (result) {
      return this.getEjercicioRespuestaByID(id_ejercicio, id_respuesta);
    }

    return null;
  }

  static async deleteEjercicioRespuestasByEjercicio(
    id_ejercicio: number
  ): Promise<boolean> {
    const result = await db.query<ResultSetHeader>(
      "DELETE FROM EJERCICIOS_RESPUESTAS WHERE ID_EJERCICIO = ?",
      [id_ejercicio]
    );

    return result ? true : false;
  }
}
