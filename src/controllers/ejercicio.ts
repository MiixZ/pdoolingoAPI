import { Request, Response } from "express";
import servicioEjercicio from "../services/ejercicio";
import { sendError, sendSuccess } from "../utils/requestHandler";

class controladorEjercicio {
  async getEjercicios(req: Request, res: Response) {
    try {
      const ejercicios = await servicioEjercicio.getEjercicios();

      ejercicios.length > 0
        ? sendSuccess(res, ejercicios)
        : sendError(res, "No hay ejercicios registrados", 404);
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

      result
        ? sendSuccess(res, result)
        : sendError(res, "No se pudo crear el ejercicio", 500);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  async updateEjercicio(req: Request, res: Response) {
    try {
      const ejercicio = req.body;
      const id = Number(req.params["id"]);
      //  TODO: Validar los datos de entrada.
      const result = await servicioEjercicio.updateEjercicio(id, ejercicio);

      result
        ? sendSuccess(res, result)
        : sendError(res, "Ejercicio no encontrado", 404);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  async deleteEjercicio(req: Request, res: Response) {
    try {
      const id = Number(req.params["id"]);
      const result = await servicioEjercicio.deleteEjercicio(id);

      result
        ? sendSuccess(res, "Ejercicio eliminado")
        : sendError(res, "Ejercicio no encontrado", 404);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}

export default new controladorEjercicio();
