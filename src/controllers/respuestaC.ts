import { Request, Response } from "express";
import servicioRespuesta from "../services/servicioRespuesta";
import { sendError, sendSuccess } from "../utils/requestHandler";

class controladorRespuesta {
  async getRespuestas(req: Request, res: Response) {
    try {
      const respuestas = await servicioRespuesta.getRespuestas();
      sendSuccess(res, respuestas);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}

export default new controladorRespuesta();
