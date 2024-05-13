export interface Ejercicio {
  id: number;
  enunciado: string;
  tipo: tipoEjercicio;
  coste_pista: number;
  tipo_coste_pista: tipoCostePista;
  xp: number;
}

enum tipoEjercicio {
  Flecha = "flecha",
  Unir = "unir",
  Rellenar = "rellenar",
  Texto = "texto",
}

enum tipoCostePista {
  Vida = "vidas",
  XP = "experiencia",
}
