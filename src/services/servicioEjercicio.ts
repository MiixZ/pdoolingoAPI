import { Ejercicio } from "../models/ejercicio";
import db from "../database/database";

class servicioEjercicio {
  async getEjercicios(): Promise<Ejercicio[]> {
    const ejercicios = await db.query("SELECT * FROM EJERCICIOS");

    return ejercicios as Ejercicio[];
  }
}

export default new servicioEjercicio();
