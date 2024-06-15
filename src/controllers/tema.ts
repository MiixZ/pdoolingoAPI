import { Request, Response } from "express";
import { sendError, sendSuccess } from "../utils/requestHandler";
import { TemaModel } from "../models/tema";

export class controladorTema {
  static async getTemas(req: Request, res: Response) {
    try {
      const temas = await TemaModel.getTemas();

      temas.length > 0
        ? sendSuccess(res, temas)
        : sendError(res, "No hay temas registrados", 404);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async getTemabyID(req: Request, res: Response) {
    try {
      const id = Number(req.params["id"]);
      const tema = await TemaModel.getTemaByID(id);

      tema ? sendSuccess(res, tema) : sendError(res, "Tema no encontrado", 404);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async createTema(req: Request, res: Response) {
    try {
      const tema = req.body;

      const result = await TemaModel.createTema(tema);

      result
        ? sendSuccess(res, result)
        : sendError(res, "No se pudo crear el tema", 500);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async updateTema(req: Request, res: Response) {
    try {
      const tema = req.body;
      const id = Number(req.params["id"]);

      const result = await TemaModel.updateTema(id, tema);

      result
        ? sendSuccess(res, result)
        : sendError(res, "No se pudo actualizar el tema", 500);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async deleteTema(req: Request, res: Response) {
    try {
      const id = Number(req.params["id"]);
      const result = await TemaModel.deleteTema(id);

      result
        ? sendSuccess(res, "Tema eliminado")
        : sendError(res, "No se pudo eliminar el tema", 500);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}
