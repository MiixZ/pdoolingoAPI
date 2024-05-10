export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  contrasena: string;
  DNI: DNI;
  vidas: number;
  tipo: TipoUsuario;
}

interface DNI {
  numero: number;
  letra: string;
}

enum TipoUsuario {
  Estudiante = "estudiante",
  Profesor = "profesor",
  Administrador = "admin",
}
