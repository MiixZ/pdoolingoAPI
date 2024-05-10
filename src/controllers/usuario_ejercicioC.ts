import { Request, Response } from "express";
import servicioUsuarioEjercicio from "../services/servicioUsuEjer";
import { sendError, sendSuccess } from "../utils/requestHandler";

class controladorUsuarioEjercicios {
  async getUsuarioEjercicios(req: Request, res: Response) {
    try {
      const usuarios_ejercicios =
        await servicioUsuarioEjercicio.getUsuarioEjercicios();
      sendSuccess(res, usuarios_ejercicios);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}

export default new controladorUsuarioEjercicios();
