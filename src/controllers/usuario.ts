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

  static async getUsuariosBySesion(req: Request, res: Response) {
    try {
      const data = req.body;
      const nombreCompleto = data.nombreCompleto;
      const email = data.email;
      const usuarios = await usuarioModel.getUsuariosByNombreApellidosEmail(
        nombreCompleto,
        email
      );

      if (usuarios) {
        sendSuccess(res, usuarios);
      } else {
        sendError(res, "Usuario no encontrado", 404);
      }
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async getUsuarioByDNI(req: Request, res: Response) {
    try {
      const dniString = req.body;
      const dni = {
        numero: Number(dniString.slice(0, -1)),
        letra: dniString.slice(-1),
      };
      const usuario = await usuarioModel.getUsuarioByDNI(dni);

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
