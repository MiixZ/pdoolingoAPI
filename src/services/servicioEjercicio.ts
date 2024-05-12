import { Ejercicio } from "../models/ejercicio";
import db from "../database/database";
import { ResultSetHeader, RowDataPacket } from "mysql2";

class servicioEjercicio {
  async getEjercicios(): Promise<Ejercicio[]> {
    const ejercicios = await db.query<RowDataPacket[]>(
      "SELECT * FROM EJERCICIOS"
    );

    return ejercicios as Ejercicio[];
  }

  async getEjercicioByID(id: number): Promise<Ejercicio | null> {
    const ejercicio = await db.query<RowDataPacket[]>(
      "SELECT * FROM EJERCICIOS WHERE ID = ?",
      id
    );

    if (Array.isArray(ejercicio) && ejercicio.length > 0) {
      return ejercicio[0] as Ejercicio;
    }

    return null;
  }

  async createEjercicio(data: Ejercicio): Promise<Ejercicio | null> {
    const result = await db.query<ResultSetHeader>(
      "INSERT INTO EJERCICIOS SET ?",
      data
    );

    if (result.insertId) {
      return this.getEjercicioByID(result.insertId);
    }

    return null;
  }
}

export default new servicioEjercicio();
