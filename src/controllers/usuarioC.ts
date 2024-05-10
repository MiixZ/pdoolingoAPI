import { Request, Response } from "express";
import servicioUsuario from "../services/servicioUsuario";
import { sendError, sendSuccess } from "../utils/requestHandler";

class controladorUsuario {
  async getAllUsers(req: Request, res: Response) {
    try {
      const usuarios = await servicioUsuario.getAllUsers();
      sendSuccess(res, usuarios);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}

export default new controladorUsuario();
