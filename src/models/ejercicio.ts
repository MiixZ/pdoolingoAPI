import db from "../database/database";
import { ResultSetHeader, RowDataPacket } from "mysql2";

interface Ejercicio {
  id: number;
  enunciado: string;
  tipo: tipoEjercicio;
  coste_pista: number;
  tipo_coste_pista: tipoCostePista;
  xp: number;
}

enum tipoEjercicio {
  Flecha = "flecha",
  Unir = "unir",
  Rellenar = "rellenar",
  Texto = "texto",
}

enum tipoCostePista {
  Vida = "vidas",
  XP = "experiencia",
}

export class EjercicioModel {
  static async getEjercicios(): Promise<Ejercicio[]> {
    const ejercicios = await db.query<RowDataPacket[]>(
      "SELECT * FROM EJERCICIOS"
    );

    return ejercicios as Ejercicio[];
  }

  public static async getEjercicioByID(id: number): Promise<Ejercicio | null> {
    const ejercicio = await db.query<RowDataPacket[]>(
      "SELECT * FROM EJERCICIOS WHERE ID = ?",
      id
    );

    if (Array.isArray(ejercicio) && ejercicio.length > 0) {
      return ejercicio[0] as Ejercicio;
    }

    return null;
  }

  static async createEjercicio(data: Ejercicio): Promise<Ejercicio | null> {
    const result = await db.query<ResultSetHeader>(
      "INSERT INTO EJERCICIOS SET ?",
      data
    );

    if (result.insertId) {
      return this.getEjercicioByID(result.insertId);
    }

    return null;
  }

  static async updateEjercicio(
    id: number,
    data: Ejercicio
  ): Promise<Ejercicio | null> {
    const result = await db.query<ResultSetHeader>(
      "UPDATE EJERCICIOS SET ? WHERE ID = ?",
      [data, id]
    );

    if (result.affectedRows) {
      return this.getEjercicioByID(id);
    }

    return null;
  }

  static async deleteEjercicio(id: number): Promise<boolean> {
    const result = await db.query<ResultSetHeader>(
      "DELETE FROM EJERCICIOS WHERE ID = ?",
      id
    );

    return result.affectedRows > 0;
  }
}
