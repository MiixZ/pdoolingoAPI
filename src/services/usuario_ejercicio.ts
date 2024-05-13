import { usuario_ejercicio } from "../models/usuario_ejercicio";
import db from "../database/database";
import { RowDataPacket } from "mysql2";

class servicioUsuarioEjercicio {
  async getUsuarioEjercicios(): Promise<usuario_ejercicio[]> {
    const usu_ejer = await db.query<RowDataPacket[]>(
      "SELECT * FROM USUARIOS_EJERCICIOS"
    );

    return usu_ejer as usuario_ejercicio[];
  }
}

export default new servicioUsuarioEjercicio();
