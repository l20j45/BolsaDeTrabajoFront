export interface EstudianteNormal {
  message: string;
  data: Estudiante[];
}

export interface Estudiante {
  idEstudiante: number;
  uuid: string;
  codigoAlumno: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  telefono: string;
  correo: string;
  carrera?: string | null;
  estatus?: string | null;
  semestre?: string | null;
  foto?: string | null;
  curriculum?: string | null;
  puestoDeseado?: string | null;
  descripcion?: string | null;
}


export interface Idioma {
  value: number; 
  label: string
}