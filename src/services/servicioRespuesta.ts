import { Respuesta } from "../models/respuesta";
import db from "../database/database";
import { RowDataPacket } from "mysql2";

class servicioRespuesta {
  async getRespuestas(): Promise<Respuesta[]> {
    const respuestas = await db.query<RowDataPacket[]>(
      "SELECT * FROM RESPUESTAS"
    );

    return respuestas as Respuesta[];
  }
}

export default new servicioRespuesta();
