import { Respuesta } from "../models/respuesta";
import db from "../database/database";

class servicioRespuesta {
  async getRespuestas(): Promise<Respuesta[]> {
    const respuestas = await db.query("SELECT * FROM RESPUESTAS");

    return respuestas as Respuesta[];
  }
}

export default new servicioRespuesta();
