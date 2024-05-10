import { usuario_ejercicio } from "../models/usuario_ejercicio";
import db from "../database/database";

class servicioUsuarioEjercicio {
  async getUsuarioEjercicios(): Promise<usuario_ejercicio[]> {
    const usu_ejer = await db.query("SELECT * FROM USUARIOS_EJERCICIOS");

    return usu_ejer as usuario_ejercicio[];
  }
}

export default new servicioUsuarioEjercicio();
