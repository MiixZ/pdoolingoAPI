export interface Ejercicio {
  id: number;
  enunciado: string;
  tipo: tipoEjercicio;
  costePista: number;
  tipoCostePista: tipoCostePista;
  xp: number;
}

enum tipoEjercicio {
  Flecha = "flecha",
  Unir = "unir",
  Rellenar = "rellenar",
  Texto = "texto",
}

enum tipoCostePista {
  Vida = "vida",
  XP = "experiencia",
}
