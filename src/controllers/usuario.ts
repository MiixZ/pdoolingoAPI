import { Request, Response } from "express";
import { usuarioModel } from "../models/usuario";
import { sendError, sendSuccess } from "../utils/requestHandler";
import path from "path";
import fs from "fs";
import csv from "csv-parser";
import { v4 as uuidv4 } from "uuid";

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
      const email = data.email;
      const usuarios = await usuarioModel.getUsuarioByEmail(email);

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

  static async getUsuariosByGrupo(req: Request, res: Response) {
    try {
      const grupo = Number(req.params.grupo);
      const usuarios = await usuarioModel.getUsuariosByGrupo(grupo);

      if (usuarios) {
        sendSuccess(res, usuarios);
      } else {
        sendError(res, "Usuarios no encontrados", 404);
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

  static async loadCSV(req: Request, res: Response) {
    const file = req.file;

    if (!file) {
      return res
        .status(400)
        .json({ message: "No se ha subido ningún archivo." });
    }

    if (path.extname(file.originalname) !== ".csv") {
      return res.status(400).json({ message: "El archivo no es un CSV." });
    }

    const usuarios: any[] = [];
    const csvFilePath = file.path;

    let delimiter = ",";
    const firstLine = fs.readFileSync(csvFilePath, "utf8").split("\n")[0];
    if (firstLine.includes(";")) {
      delimiter = ";";
    }

    const cleanRow = (row: any) => {
      const cleanedRow: any = {};
      for (const key in row) {
        const cleanedKey = key.trim();
        cleanedRow[cleanedKey] = row[key].trim();
      }
      return cleanedRow;
    };

    fs.createReadStream(csvFilePath)
      .pipe(csv({ separator: delimiter }))
      .on("data", (row) => {
        const cleanedRow = cleanRow(row);
        const usuario: any = {
          id: uuidv4(),
          nombre: cleanedRow.nombre || cleanedRow.NOMBRE,
          apellidos: cleanedRow.apellidos || cleanedRow.APELLIDOS,
          email:
            cleanedRow.email ||
            cleanedRow.correo ||
            cleanedRow.EMAIL ||
            cleanedRow.CORREO,
          DNI: cleanedRow.dni || cleanedRow.DNI,
          vidas: 5,
          tipo: "estudiante",
          grupo: req.body.grupo,
        };

        usuarios.push(usuario);
      })
      .on("end", async () => {
        try {
          for (const usuario of usuarios) {
            await usuarioModel.createUsuario(usuario);
          }

          sendSuccess(res, "Usuarios cargados correctamente");
        } catch (error: any) {
          sendError(res, error.message, 500);
        }
      })
      .on("error", (error) => {
        sendError(res, "Error al leer el archivo CSV", 500);
      });
  }
}
