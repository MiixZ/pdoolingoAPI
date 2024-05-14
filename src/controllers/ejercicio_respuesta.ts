import { Request, Response } from "express";
import { ERModel } from "../models/ejercicio_respuesta";
import { sendError, sendSuccess } from "../utils/requestHandler";

class controladorRespuesta {
  async getEjerciciosRespuestas(req: Request, res: Response) {
    try {
      const ER = await ERModel.getEjercicioRespuestas();
      sendSuccess(res, ER);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}

export default new controladorRespuesta();
