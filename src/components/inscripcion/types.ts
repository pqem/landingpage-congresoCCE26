export type Alojamiento = "si" | "no" | "";

export type Familiar = {
  id: number;
  nombre: string;
  edad: string;
  parentesco: "Esposo/a" | "Hijo/a" | "Otro";
};
