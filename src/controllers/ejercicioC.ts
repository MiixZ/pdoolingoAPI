import { Request, Response } from "express";
import servicioEjercicio from "../services/servicioEjercicio";
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
}

export default new controladorEjercicio();
