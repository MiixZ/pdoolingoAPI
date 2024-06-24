import db from "../database/database";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface usuario_ejercicio {
  id_usuario: string;
  id_ejercicio: number;
  xp_ganada: number;
}

export class UEModel {
  static async getUsuarioEjercicios(): Promise<usuario_ejercicio[]> {
    const usu_ejer = await db.query<RowDataPacket[]>(
      "SELECT * FROM USUARIOS_EJERCICIOS"
    );

    return usu_ejer as usuario_ejercicio[];
  }

  static async getUsuarioEjercicioByID(
    id_usuario: string,
    id_ejercicio: number
  ): Promise<usuario_ejercicio | null> {
    const usu_ejer = await db.query<RowDataPacket[]>(
      "SELECT * FROM USUARIOS_EJERCICIOS WHERE ID_USUARIO = ? AND ID_EJERCICIO = ?",
      [id_usuario, id_ejercicio]
    );

    if (Array.isArray(usu_ejer) && usu_ejer.length > 0) {
      return usu_ejer[0] as usuario_ejercicio;
    }

    return null;
  }

  static async getEjerciciosByUsuario(
    id_usuario: string
  ): Promise<usuario_ejercicio[]> {
    const ejercicios = await db.query<RowDataPacket[]>(
      "SELECT * FROM USUARIOS_EJERCICIOS WHERE ID_USUARIO = ?",
      [id_usuario]
    );

    return ejercicios as usuario_ejercicio[];
  }

  static async getEjerciciosTemaByUsuario(
    id_usuario: string,
    id_tema: number
  ): Promise<usuario_ejercicio[]> {
    const ejercicios = await db.query<RowDataPacket[]>(
      "SELECT UE.ID_USUARIO, UE.ID_EJERCICIO, UE.xp_ganada FROM USUARIOS_EJERCICIOS AS UE JOIN EJERCICIOS AS E ON UE.ID_EJERCICIO = E.ID WHERE UE.ID_USUARIO = ? AND E.ID_TEMA = ?",
      [id_usuario, id_tema]
    );

    return ejercicios as usuario_ejercicio[];
  }

  static async asignarEjercicio(
    id_usuario: string,
    id_ejercicio: number,
    xp_ganada: number
  ): Promise<usuario_ejercicio | null> {
    const usuarioEjercicioExistente = await db.query<RowDataPacket[]>(
      "SELECT * FROM USUARIOS_EJERCICIOS WHERE ID_USUARIO = ? AND ID_EJERCICIO = ?",
      [id_usuario, id_ejercicio]
    );

    if (
      Array.isArray(usuarioEjercicioExistente) &&
      usuarioEjercicioExistente.length > 0
    ) {
      const result = await db.query<ResultSetHeader>(
        "UPDATE USUARIOS_EJERCICIOS SET XP_GANADA = ? WHERE ID_USUARIO = ? AND ID_EJERCICIO = ?",
        [xp_ganada, id_usuario, id_ejercicio]
      );

      if (result) {
        return this.getUsuarioEjercicioByID(id_usuario, id_ejercicio);
      }
    } else {
      const result = await db.query<ResultSetHeader>(
        "INSERT INTO USUARIOS_EJERCICIOS (ID_USUARIO, ID_EJERCICIO, XP_GANADA) VALUES (?, ?, ?)",
        [id_usuario, id_ejercicio, xp_ganada]
      );

      if (result.affectedRows > 0) {
        return this.getUsuarioEjercicioByID(id_usuario, id_ejercicio);
      }
    }

    return null;
  }

  static async desasignarEjercicio(
    id_usuario: string,
    id_ejercicio: number
  ): Promise<boolean> {
    const result = await db.query<ResultSetHeader>(
      "DELETE FROM USUARIOS_EJERCICIOS WHERE ID_USUARIO = ? AND ID_EJERCICIO = ?",
      [id_usuario, id_ejercicio]
    );

    return result.affectedRows > 0;
  }

  static async desasignarEjerciciosByEjercicio(
    id_ejercicio: number
  ): Promise<boolean> {
    const result = await db.query<ResultSetHeader>(
      "DELETE FROM USUARIOS_EJERCICIOS WHERE ID_EJERCICIO = ?",
      [id_ejercicio]
    );

    return result.affectedRows > 0;
  }

  static async desasignarEjerciciosByUsuario(
    id_usuario: string
  ): Promise<boolean> {
    const result = await db.query<ResultSetHeader>(
      "DELETE FROM USUARIOS_EJERCICIOS WHERE ID_USUARIO = ?",
      [id_usuario]
    );

    return result.affectedRows > 0;
  }
}
