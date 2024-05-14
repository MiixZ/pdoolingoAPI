import db from "../database/database";
import { RowDataPacket } from "mysql2";

export interface usuario_ejercicio {
  id_usuario: number;
  id_ejercicio: number;
}

export class UEModel {
  static async getUsuarioEjercicios(): Promise<usuario_ejercicio[]> {
    const usu_ejer = await db.query<RowDataPacket[]>(
      "SELECT * FROM USUARIOS_EJERCICIOS"
    );

    return usu_ejer as usuario_ejercicio[];
  }
}
