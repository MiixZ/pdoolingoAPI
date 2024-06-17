import { Request, Response } from "express";
import { sendError, sendSuccess } from "../utils/requestHandler";
import { GrupoModel } from "../models/grupo";

export class controladorGrupo {
  static async getGrupos(req: Request, res: Response) {
    try {
      const grupos = await GrupoModel.getGrupos();

      grupos.length > 0
        ? sendSuccess(res, grupos)
        : sendError(res, "No hay grupos registrados", 404);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async getGrupobyID(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const grupo = await GrupoModel.getGrupoByID(id);

      grupo
        ? sendSuccess(res, grupo)
        : sendError(res, "Grupo no encontrado", 404);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async createGrupo(req: Request, res: Response) {
    try {
      const grupo = req.body;

      const result = await GrupoModel.createGrupo(grupo);

      result
        ? sendSuccess(res, result)
        : sendError(res, "No se pudo crear el grupo", 500);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async updateGrupo(req: Request, res: Response) {
    try {
      const grupo = req.body;
      const id = Number(req.params.id);

      const result = await GrupoModel.updateGrupo(id, grupo);

      result
        ? sendSuccess(res, result)
        : sendError(res, "No se pudo actualizar el grupo", 500);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async deleteGrupo(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await GrupoModel.deleteGrupo(id);

      result
        ? sendSuccess(res, "Grupo eliminado correctamente")
        : sendError(res, "No se pudo eliminar el grupo", 500);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}
