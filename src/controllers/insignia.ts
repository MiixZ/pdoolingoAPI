import { Request, Response } from "express";
import { sendError, sendSuccess } from "../utils/requestHandler";
import { InsigniaModel } from "../models/insignia";

export class controladorInsignia {
  static async getInsignias(req: Request, res: Response) {
    try {
      const insignias = await InsigniaModel.getInsignias();

      insignias.length > 0
        ? sendSuccess(res, insignias)
        : sendError(res, "No hay insignias registradas", 404);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async getInsigniabyID(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const insignia = await InsigniaModel.getInsigniaByID(id);

      insignia
        ? sendSuccess(res, insignia)
        : sendError(res, "Insignia no encontrada", 404);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async getInsigniasByTema(req: Request, res: Response) {
    try {
      const id_tema = Number(req.params.id_tema);
      const insignias = await InsigniaModel.getInsigniasByTema(id_tema);

      insignias.length > 0
        ? sendSuccess(res, insignias)
        : sendError(res, "No hay insignias registradas para ese tema", 404);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async createInsignia(req: Request, res: Response) {
    try {
      const insignia = req.body;

      const result = await InsigniaModel.createInsignia(insignia);

      result
        ? sendSuccess(res, result)
        : sendError(res, "No se pudo crear la insignia", 500);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async updateInsignia(req: Request, res: Response) {
    try {
      const insignia = req.body;
      const id = Number(req.params.id);
      const result = await InsigniaModel.updateInsignia(id, insignia);

      result
        ? sendSuccess(res, result)
        : sendError(res, "Insignia no encontrada", 404);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async deleteInsignia(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await InsigniaModel.deleteInsignia(id);

      result
        ? sendSuccess(res, "Insignia eliminada")
        : sendError(res, "Insignia no encontrada", 404);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async deleteInsigniaByTema(req: Request, res: Response) {
    try {
      const id_tema = Number(req.params.id_tema);
      const result = await InsigniaModel.deleteInsigniasByTema(id_tema);

      result
        ? sendSuccess(res, "Insignias eliminadas")
        : sendError(res, "No hay insignias para ese tema", 404);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}
