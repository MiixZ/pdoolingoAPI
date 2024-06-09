import { Request, Response } from "express";
import { UEModel } from "../models/usuario_ejercicio";
import { sendError, sendSuccess } from "../utils/requestHandler";

export class controladorUE {
  static async getUsuarioEjercicios(req: Request, res: Response) {
    try {
      const usuarios_ejercicios = await UEModel.getUsuarioEjercicios();
      sendSuccess(res, usuarios_ejercicios);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async getUsuarioEjercicioByID(req: Request, res: Response) {
    try {
      const id_usuario = String(req.params.id_usuario);
      const id_ejercicio = Number(req.params.id_ejercicio);
      const usuario_ejercicio = await UEModel.getUsuarioEjercicioByID(
        id_usuario,
        id_ejercicio
      );

      if (usuario_ejercicio) {
        sendSuccess(res, usuario_ejercicio);
      } else {
        sendError(res, "Usuario ejercicio no encontrado", 404);
      }
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async getEjerciciosByUsuario(req: Request, res: Response) {
    try {
      const id_usuario = String(req.params.id_usuario);
      const ejercicios = await UEModel.getEjerciciosByUsuario(id_usuario);
      sendSuccess(res, ejercicios);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async asignarEjercicio(req: Request, res: Response) {
    try {
      const id_usuario = String(req.body.id_usuario);
      const id_ejercicio = Number(req.body.id_ejercicio);
      const xp_ganada = Number(req.body.xp_ganada);

      const usuario_ejercicio = await UEModel.asignarEjercicio(
        id_usuario,
        id_ejercicio,
        xp_ganada
      );

      if (usuario_ejercicio) {
        sendSuccess(res, usuario_ejercicio);
      } else {
        sendError(res, "No se pudo asignar el ejercicio");
      }
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async desasignarEjercicio(req: Request, res: Response) {
    try {
      const id_usuario = String(req.params.id_usuario);
      const id_ejercicio = Number(req.params.id_ejercicio);
      const result = await UEModel.desasignarEjercicio(
        id_usuario,
        id_ejercicio
      );

      if (result) {
        sendSuccess(res, "Ejercicio desasignado correctamente");
      } else {
        sendError(res, "No se pudo desasignar el ejercicio");
      }
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async desasignarEjerciciosByEjercicio(req: Request, res: Response) {
    try {
      const id_ejercicio = Number(req.params.id_ejercicio);
      const result = await UEModel.desasignarEjerciciosByEjercicio(
        id_ejercicio
      );

      if (result) {
        sendSuccess(res, "Ejercicios desasignados correctamente");
      } else {
        sendError(res, "No se pudieron desasignar los ejercicios");
      }
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}
