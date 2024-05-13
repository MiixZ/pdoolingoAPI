import { Request, Response } from "express";
import servicioEjercicio from "../services/ejercicio";
import { sendError, sendSuccess } from "../utils/requestHandler";

class controladorEjercicio {
  async getEjercicios(req: Request, res: Response) {
    try {
      const ejercicios = await servicioEjercicio.getEjercicios();
      sendSuccess(res, ejercicios);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  async getEjerciciobyID(req: Request, res: Response) {
    try {
      const id = Number(req.params["id"]);
      const ejercicio = await servicioEjercicio.getEjercicioByID(id);

      ejercicio
        ? sendSuccess(res, ejercicio)
        : sendError(res, "Ejercicio no encontrado", 404);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  async createEjercicio(req: Request, res: Response) {
    try {
      const ejercicio = req.body;
      //  TODO: Validar los datos de entrada.
      const result = await servicioEjercicio.createEjercicio(ejercicio);

      if (result) {
        sendSuccess(res, result);
      } else {
        sendError(res, "No se pudo crear el ejercicio", 500);
      }
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}

export default new controladorEjercicio();
