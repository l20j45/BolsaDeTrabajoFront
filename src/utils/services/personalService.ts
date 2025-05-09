
import { apiUrl } from '../data'; // Asegúrate de que la ruta sea correcta
import type { Estudiante, EstudianteNormal } from '../interfaces'; // Asegúrate de que la ruta sea correcta

export class PersonalService {


  /**
   * Obtiene los datos de un estudiante por su ID
   * @param id ID del estudiante
   * @returns Promise con los datos del estudiante
   */
  async fetchTodosLosAlumnos(): Promise<any> {
  
    try {
      const response = await fetch(`${apiUrl}personalController.php?alumnos=todos`);
      if (!response.ok) throw new Error("Error al obtener datos");
      const data: any = await response.json();
      const datosEstudiantes = data.data;
      return datosEstudiantes;
    } catch (err) {
      console.error("Error:", err);
      throw err;
    } finally {
  
    }
  }

}