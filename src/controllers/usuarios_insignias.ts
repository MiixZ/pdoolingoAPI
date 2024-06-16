import { Request, Response } from "express";
import { sendError, sendSuccess } from "../utils/requestHandler";
import { UIModel } from "../models/usuarios_insignias";

export class controladorUI {
  static async getUsuarioInsignias(req: Request, res: Response) {
    try {
      const usuario_insignias = await UIModel.getUsuarioInsignias();
      sendSuccess(res, usuario_insignias);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async getUsuarioInsigniaByID(req: Request, res: Response) {
    try {
      const id_usuario = String(req.params.id_usuario);
      const id_insignia = Number(req.params.id_insignia);
      const usuario_insignia = await UIModel.getUsuarioInsigniaByID(
        id_usuario,
        id_insignia
      );

      if (usuario_insignia) {
        sendSuccess(res, usuario_insignia);
      } else {
        sendError(res, "Usuario insignia no encontrado", 404);
      }
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async getInsigniasByUsuario(req: Request, res: Response) {
    try {
      const id_usuario = String(req.params.id_usuario);
      const insignias = await UIModel.getInsigniasByUsuario(id_usuario);
      sendSuccess(res, insignias);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async asignarInsignia(req: Request, res: Response) {
    try {
      const id_usuario = String(req.body.id_usuario);
      const id_insignia = Number(req.body.id_insignia);

      const asignada = await controladorUI.comprobarAsignacion(
        id_usuario,
        id_insignia
      );

      if (asignada) {
        sendSuccess(res, "La insignia ya ha sido asignada a este usuario");
        return;
      }

      const usuario_insignia = await UIModel.asignarInsignia(
        id_usuario,
        id_insignia
      );

      if (usuario_insignia) {
        sendSuccess(res, usuario_insignia);
      } else {
        sendError(res, "No se pudo asignar la insignia");
      }
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async comprobarAsignacion(id_usuario: string, id_insignia: number) {
    const usuario_insignia = await UIModel.getUsuarioInsigniaByID(
      id_usuario,
      id_insignia
    );

    return usuario_insignia ? true : false;
  }

  static async desasignarInsignia(req: Request, res: Response) {
    try {
      const id_usuario = String(req.params.id_usuario);
      const id_insignia = Number(req.params.id_insignia);
      const usuario_insignia = await UIModel.desasignarInsignia(
        id_usuario,
        id_insignia
      );

      if (usuario_insignia) {
        sendSuccess(res, usuario_insignia);
      } else {
        sendError(res, "No se pudo desasignar la insignia");
      }
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async desasignarInsigniasByUsuario(req: Request, res: Response) {
    try {
      const id_usuario = String(req.params.id_usuario);
      const result = await UIModel.desasignarInsigniasByUsuario(id_usuario);

      if (result) {
        sendSuccess(res, "Insignias desasignadas correctamente");
      } else {
        sendError(res, "No se pudieron desasignar las insignias");
      }
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async desasignarInsigniasByInsignia(req: Request, res: Response) {
    try {
      const id_insignia = Number(req.params.id_insignia);
      const result = await UIModel.desasignarInsigniasByInsignia(id_insignia);

      if (result) {
        sendSuccess(res, "Insignias desasignadas correctamente");
      } else {
        sendError(res, "No se pudieron desasignar las insignias");
      }
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}
