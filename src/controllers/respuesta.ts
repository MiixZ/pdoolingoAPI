import { Request, Response } from "express";
import { RespuestaModel } from "../models/respuesta";
import { sendError, sendSuccess } from "../utils/requestHandler";

export class controladorRespuesta {
  static async getRespuestas(req: Request, res: Response) {
    try {
      const respuestas = await RespuestaModel.getRespuestas();
      sendSuccess(res, respuestas);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async getRespuestaByID(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const respuesta = await RespuestaModel.getRespuestaByID(id);
      sendSuccess(res, respuesta);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async createRespuesta(req: Request, res: Response) {
    try {
      const data = req.body;
      const respuesta = await RespuestaModel.createRespuesta(data);
      sendSuccess(res, respuesta);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async updateRespuesta(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const respuesta = await RespuestaModel.updateRespuesta(id, data);
      sendSuccess(res, respuesta);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async deleteRespuesta(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await RespuestaModel.deleteRespuesta(id);
      sendSuccess(res, result);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}
