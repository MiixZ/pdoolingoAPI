import { Request, Response } from "express";
import { usuarioModel } from "../models/usuario";
import { sendError, sendSuccess } from "../utils/requestHandler";

export class controladorUsuario {
  static async getUsuarios(req: Request, res: Response) {
    try {
      const usuarios = await usuarioModel.getUsuarios();
      sendSuccess(res, usuarios);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async getUsuarioByID(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const usuario = await usuarioModel.getUsuarioByID(id);

      if (usuario) {
        sendSuccess(res, usuario);
      } else {
        sendError(res, "Usuario no encontrado", 404);
      }
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async createUsuario(req: Request, res: Response) {
    try {
      const usuario = req.body;
      const result = await usuarioModel.createUsuario(usuario);

      if (result) {
        sendSuccess(res, result);
      } else {
        sendError(res, "No se pudo crear el usuario", 500);
      }
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async updateUsuario(req: Request, res: Response) {
    try {
      const usuario = req.body;
      const id = String(req.params.id);
      const result = await usuarioModel.updateUsuario(id, usuario);

      if (result) {
        sendSuccess(res, result);
      } else {
        sendError(res, "Usuario no encontrado", 404);
      }
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async deleteUsuario(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const result = await usuarioModel.deleteUsuario(id);

      if (result) {
        sendSuccess(res, "Usuario eliminado");
      } else {
        sendError(res, "Usuario no encontrado", 404);
      }
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}
