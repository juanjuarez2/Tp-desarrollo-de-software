export interface Alumno{
  id: number;  // El ID puede ser opcional al crear un nuevo alumno
  nombre: string;
  fechaNac:Date; // Usa string para representar la fecha, luego puedes transformarla
}
