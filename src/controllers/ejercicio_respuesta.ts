import { Request, Response } from "express";
import { ERModel } from "../models/ejercicio_respuesta";
import { sendError, sendSuccess } from "../utils/requestHandler";

export class controladorER {
  static async getEjerciciosRespuestas(req: Request, res: Response) {
    try {
      const ER = await ERModel.getEjercicioRespuestas();
      sendSuccess(res, ER);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async getEjercicioRespuestabyID(req: Request, res: Response) {
    try {
      const { id_ejercicio, id_respuesta } = req.params;
      const ER = await ERModel.getEjercicioRespuestaByID(
        Number(id_ejercicio),
        Number(id_respuesta)
      );

      if (ER) {
        sendSuccess(res, ER);
      } else {
        sendError(res, "Ejercicio-Respuesta no encontrado");
      }
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async asignarRespuesta(req: Request, res: Response) {
    try {
      const { id_ejercicio, id_respuesta, es_correcta } = req.body;
      const ER = await ERModel.asignarRespuesta(
        id_ejercicio,
        id_respuesta,
        es_correcta
      );

      if (ER) {
        sendSuccess(res, ER);
      } else {
        sendError(res, "No se pudo asignar la respuesta");
      }
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}
