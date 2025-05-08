
// estudianteService.ts
import { apiUrl } from '../data'; // Asegúrate de que la ruta sea correcta
import type { Estudiante, EstudianteNormal } from '../interfaces'; // Asegúrate de que la ruta sea correcta
import { estudiante, loading, error, submitting, submitSuccess, submitError } from '../Stores/storeEstudianteService';

export class EstudianteService {


  /**
   * Obtiene los datos de un estudiante por su ID
   * @param id ID del estudiante
   * @returns Promise con los datos del estudiante
   */
  async fetchEstudiante(id: number): Promise<Estudiante> {
    loading.set(true);
    error.set(null);

    try {
      const response = await fetch(`${apiUrl}estudianteController.php?idEstudiante=${id}`);
      if (!response.ok) throw new Error("Error al obtener datos");

      const data: EstudianteNormal = await response.json();
      const datosEstudiante = data.data[0];
      estudiante.set(datosEstudiante);

      return datosEstudiante;
    } catch (err) {
      console.error("Error:", err);
      error.set(err instanceof Error ? err.message : 'Error desconocido');
      throw err;
    } finally {
      loading.set(false);
    }
  }

  /**
   * Obtiene los datos de un estudiante por su ID
   * @param id ID del estudiante
   * @returns Promise con los datos del estudiante
   */
  async fetchEnumData(enumColumn: string) {
    try {
      const response = await fetch(`${apiUrl}estudianteController.php?enum=${enumColumn}`);
      if (!response.ok) throw new Error("Error al obtener datos");
      let responseData = await response.json();
      return responseData.data[0];

    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  }

  /**
   * Obtiene los datos de un estudiante por su ID
   * @param id ID del estudiante
   * @returns Promise con los datos del estudiante
   */
  async fetchTodosLosIdiomas() {
    try {
      const response = await fetch(`${apiUrl}idiomasController.php?idiomas=todos`);

      if (response.status !== 200) throw new Error("Error al obtener datos");
      let responseData = await response.json();
      return responseData.data;

    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  }

  /**
   * Obtiene los datos de un estudiante por su ID
   * @param id ID del estudiante
   * @returns Promise con los datos del estudiante
   */
  async fetchIdiomasUsuarios(id) {
    try {
      const response = await fetch(`${apiUrl}idiomasController.php?idEstudiante=1008`);

      if (response.status !== 200) throw new Error("Error al obtener datos");
      let responseData = await response.json();
      return responseData.data;

    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  }

  /**
   * Obtiene los datos de un estudiante por su ID
   * @param id ID del estudiante
   * @returns Promise con los datos del estudiante
   */
  async fetchTodasLasHabilidadesBlandas() {
    try {
      const response = await fetch(`${apiUrl}HabilidadesBlandasController.php?habilidadesBlandas=todas`);

      if (response.status !== 200) throw new Error("Error al obtener datos");
      let responseData = await response.json();
      return responseData.data;

    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  }

  /**
   * Obtiene los datos de un estudiante por su ID
   * @param id ID del estudiante
   * @returns Promise con los datos del estudiante
   */
  async fetchHabilidadesBlandasUsuarios(id) {
    try {
      const response = await fetch(`${apiUrl}HabilidadesBlandasController.php?idEstudiante=1008`);

      if (response.status !== 200) throw new Error("Error al obtener datos");
      let responseData = await response.json();
      return responseData.data? responseData.data : [];

    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  }

  async fetchTodasLasHabilidadesDuras() {
    try {
      const response = await fetch(`${apiUrl}HabilidadesDurasController.php?habilidadesDuras=todas`);

      if (response.status !== 200) throw new Error("Error al obtener datos");
      let responseData = await response.json();
      return responseData.data;

    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  }

  /**
   * Obtiene los datos de un estudiante por su ID
   * @param id ID del estudiante
   * @returns Promise con los datos del estudiante
   */
  async fetchHabilidadesDurasUsuarios(id) {
    try {
      const response = await fetch(`${apiUrl}HabilidadesDurasController.php?idEstudiante=1008`);

      if (response.status !== 200) throw new Error("Error al obtener datos");
      let responseData = await response.json();
      return responseData.data? responseData.data : [];

    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  }

  /**
   * Obtiene los datos de un estudiante sin manipular los stores
   * Útil cuando quieres manejar los estados en el componente
   */
  async getEstudiante(id: number): Promise<Estudiante> {
    try {
      const response = await fetch(`${apiUrl}estudianteController.php?idEstudiante=${id}`);
      if (!response.ok) throw new Error("Error al obtener datos");

      const data: EstudianteNormal = await response.json();
      return data.data[0];
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  }


  async enviarSelects(formData: any, opcion: number) {
    let complemento = ['idiomasController.php', 'habilidadesBlandasController.php', 'habilidadesDurasController.php'][opcion - 1];
    try {
      const response = await fetch(`${apiUrl}${complemento}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (err) {
      console.error('Error al enviar formulario:', err);
      return null;
    }
  }


  async handleSubmit(formData: Estudiante): Promise<Estudiante | null> {
    submitting.set(true);
    submitSuccess.set(false);
    submitError.set(null);

    try {
      const response = await fetch(`${apiUrl}estudianteController.php`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const result: Estudiante = await response.json();
      submitSuccess.set(true);
      // Actualizar el store con los nuevos datos
      estudiante.set({ ...formData });
      return result;

    } catch (err) {
      console.error('Error al enviar formulario:', err);
      submitError.set(err instanceof Error ? err.message : 'Error al cargar los datos del estudiante');
      return null;
    } finally {
      submitting.set(false);
    }
  }

  // Método para manejar la subida de archivos
  async handleFileUpload(file: File, field: 'foto' | 'curriculum', estudianteId: number): Promise<string | null> {
    if (!file) return null;

    submitting.set(true);
    submitError.set(null);

    // Crear FormData para enviar el archivo
    const formDataFile = new FormData();
    formDataFile.append('file', file);
    formDataFile.append('idEstudiante', estudianteId.toString());
    formDataFile.append('type', field);

    try {
      const response = await fetch(`${apiUrl}fileUploadController.php`, {
        method: 'POST',
        body: formDataFile
      });

      if (!response.ok) {
        throw new Error(`Error al subir ${field}`);
      }

      const result = await response.json();
      return result.filePath;

    } catch (err) {
      console.error(`Error al subir ${field}:`, err);
      submitError.set(err instanceof Error ? err.message : 'Error al cargar los datos del estudiante');
      return null;
    } finally {
      submitting.set(false);
    }
  }
}