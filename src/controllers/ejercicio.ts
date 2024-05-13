import { Request, Response } from "express";
import { sendError, sendSuccess } from "../utils/requestHandler";
import { EjercicioModel } from "../models/ejercicio";

export class controladorEjercicio {
  static async getEjercicios(req: Request, res: Response) {
    try {
      const ejercicios = await EjercicioModel.getEjercicios();

      ejercicios.length > 0
        ? sendSuccess(res, ejercicios)
        : sendError(res, "No hay ejercicios registrados", 404);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async getEjerciciobyID(req: Request, res: Response) {
    try {
      const id = Number(req.params["id"]);
      const ejercicio = await EjercicioModel.getEjercicioByID(id);

      ejercicio
        ? sendSuccess(res, ejercicio)
        : sendError(res, "Ejercicio no encontrado", 404);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async createEjercicio(req: Request, res: Response) {
    try {
      const ejercicio = req.body;
      //  TODO: Validar los datos de entrada.
      const result = await EjercicioModel.createEjercicio(ejercicio);

      result
        ? sendSuccess(res, result)
        : sendError(res, "No se pudo crear el ejercicio", 500);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async updateEjercicio(req: Request, res: Response) {
    try {
      const ejercicio = req.body;
      const id = Number(req.params["id"]);
      //  TODO: Validar los datos de entrada.
      const result = await EjercicioModel.updateEjercicio(id, ejercicio);

      result
        ? sendSuccess(res, result)
        : sendError(res, "Ejercicio no encontrado", 404);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async deleteEjercicio(req: Request, res: Response) {
    try {
      const id = Number(req.params["id"]);
      const result = await EjercicioModel.deleteEjercicio(id);

      result
        ? sendSuccess(res, "Ejercicio eliminado")
        : sendError(res, "Ejercicio no encontrado", 404);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}
