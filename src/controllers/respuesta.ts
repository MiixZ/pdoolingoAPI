import { Request, Response } from "express";
import { RespuestaModel } from "../models/respuesta";
import { sendError, sendSuccess } from "../utils/requestHandler";

class controladorRespuesta {
  async getRespuestas(req: Request, res: Response) {
    try {
      const respuestas = await RespuestaModel.getRespuestas();
      sendSuccess(res, respuestas);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}

export default new controladorRespuesta();
