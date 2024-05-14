import { Request, Response } from "express";
import { usuarioModel } from "../models/usuario";
import { sendError, sendSuccess } from "../utils/requestHandler";

class controladorUsuario {
  async getUsuarios(req: Request, res: Response) {
    try {
      const usuarios = await usuarioModel.getUsuarios();
      sendSuccess(res, usuarios);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}

export default new controladorUsuario();
