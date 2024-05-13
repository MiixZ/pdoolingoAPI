import { ejercicio_respuesta } from "../models/ejercicio_respuesta";
import db from "../database/database";
import { RowDataPacket } from "mysql2";

class servicioEjercicioRespuesta {
  async getEjercicioRespuestas(): Promise<ejercicio_respuesta[]> {
    const ejercicio_respuestas = await db.query<RowDataPacket[]>(
      "SELECT * FROM EJERCICIOS_RESPUESTAS"
    );

    return ejercicio_respuestas as ejercicio_respuesta[];
  }
}

export default new servicioEjercicioRespuesta();
