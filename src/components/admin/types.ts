export interface Stats {
  total_inscriptos: number;
  necesitan_alojamiento: number;
  total_familiares: number;
  total_personas: number;
  por_ciudad: { ciudad: string; cantidad: number }[];
  por_iglesia: { iglesia: string; cantidad: number }[];
  por_dia: { fecha: string; cantidad: number }[];
}

export interface Familiar {
  nombre_apellido: string;
  edad: number;
  parentesco: string;
}

export interface Inscripto {
  id: number;
  nombre_apellido: string;
  edad: number;
  telefono: string;
  ciudad: string;
  iglesia: string;
  necesita_alojamiento: number;
  created_at: string;
  cantidad_familiares: number;
  familiares: Familiar[];
}

export interface PaginatedResponse {
  data: Inscripto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}
