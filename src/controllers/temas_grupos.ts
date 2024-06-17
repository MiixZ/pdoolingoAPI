import { Request, Response } from "express";
import { sendError, sendSuccess } from "../utils/requestHandler";
import { TGModel } from "../models/temas_grupos";

export class controladorTG {
  static async getTemasGrupos(req: Request, res: Response) {
    try {
      const temas_grupos = await TGModel.getTemasGrupos();

      temas_grupos.length > 0
        ? sendSuccess(res, temas_grupos)
        : sendError(res, "No hay temas_grupos registrados", 404);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async getTemasGrupobyID(req: Request, res: Response) {
    try {
      const id_tema = Number(req.params.id_tema);
      const id_grupo = Number(req.params.id_grupo);
      const temas_grupo = await TGModel.getTemaGrupoByID(id_tema, id_grupo);

      temas_grupo
        ? sendSuccess(res, temas_grupo)
        : sendError(res, "Temas_grupo no encontrado", 404);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async getTemaByGrupo(req: Request, res: Response) {
    try {
      const id_grupo = Number(req.params.id_grupo);
      const temas = await TGModel.getTemasByGrupo(id_grupo);

      temas.length > 0
        ? sendSuccess(res, temas)
        : sendError(res, "No hay temas registrados para este grupo", 404);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async getGrupoByTema(req: Request, res: Response) {
    try {
      const id_tema = Number(req.params.id_tema);
      const grupos = await TGModel.getGruposByTema(id_tema);

      grupos.length > 0
        ? sendSuccess(res, grupos)
        : sendError(res, "No hay grupos registrados para este tema", 404);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async updateBloqueo(req: Request, res: Response) {
    try {
      const id_tema = Number(req.body.id_tema);
      const id_grupo = Number(req.body.id_grupo);
      const bloqueado = Boolean(req.body.bloqueado);
      const tema_grupo = await TGModel.updateBloqueo(
        id_tema,
        id_grupo,
        bloqueado
      );

      sendSuccess(res, tema_grupo);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async asignarTema(req: Request, res: Response) {
    try {
      const id_tema = Number(req.body.id_tema);
      const id_grupo = Number(req.body.id_grupo);
      const bloqueado = Boolean(req.body.bloqueado);
      const tema_grupo = await TGModel.asignarTema(
        id_tema,
        id_grupo,
        bloqueado
      );

      sendSuccess(res, tema_grupo);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async desasignarTemasByGrupo(req: Request, res: Response) {
    try {
      const id_grupo = Number(req.params.id_grupo);
      const result = await TGModel.desasignarTemasByGrupo(id_grupo);

      result
        ? sendSuccess(res, "Temas desasignados correctamente")
        : sendError(res, "No hay temas asignados a este grupo", 404);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  static async desasignarGruposByTema(req: Request, res: Response) {
    try {
      const id_tema = Number(req.params.id_tema);
      const result = await TGModel.desasignarGruposByTema(id_tema);

      result
        ? sendSuccess(res, "Grupos desasignados correctamente")
        : sendError(res, "No hay grupos asignados a este tema", 404);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}
