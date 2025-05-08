<script lang="ts">
  import { onMount } from "svelte";
  import {
    estudiante,
    loading,
    error,
    submitting,
    submitSuccess,
    submitError,
  } from "../utils/Stores/storeEstudianteService";
  import { EstudianteService } from "../utils/services/estudianteService";
  import type { Estudiante } from "../utils/interfaces/index";
  import { photoUrl } from "../utils/data"; // Asegúrate de que la ruta sea correcta
  import MultiSelectComponent from "./componentsFragment/multiSelectComponent.svelte";
  import type {
    idioma,
    habilidadesBlandas,
    habilidadesDuras,
  } from "../utils/interfaces/index";

  // ID del estudiante a cargar
  let idEstudiante: number = 1008;

  // Variable para almacenar los datos del formulario
  let formData = $state<any>({});

  // Variable para controlar mensajes de estado del envío
  let carreraEnum = $state<any>([]);
  let estatusEnum = $state<any>([]);
  const estudianteService = new EstudianteService();

  let datosInicialIdiomas = $state<idioma[]>([]);
  let valoresDeRegresoIdiomas = $state<idioma[]>([]);

  let datosInicialHabilidadesBlandas = $state<habilidadesBlandas[]>([]);
  let valoresDeRegresoHabilidadesBlandas = $state<habilidadesBlandas[]>([]);

  let datosInicialHabilidadesDuras = $state<habilidadesDuras[]>([]);
  let valoresDeRegresoHabilidadesDuras = $state<habilidadesDuras[]>([]);

  onMount(async () => {
    carreraEnum = await estudianteService.fetchEnumData("carrera");
    carreraEnum = carreraEnum.split(",").filter((item: string) => item !== "");
    estatusEnum = await estudianteService.fetchEnumData("estatus");
    estatusEnum = estatusEnum.split(",").filter((item: string) => item !== "");

    const todosLosIdiomas = await estudianteService
      .fetchTodosLosIdiomas()
      .then((res) => {
        return res.map((idioma: any) => {
          return {
            value: idioma.idIdioma,
            label: idioma.NombresIdiomasAdicionales,
          };
        });
      });
    datosInicialIdiomas.push(...todosLosIdiomas);

    const idiomasUsuarios = await estudianteService
      .fetchIdiomasUsuarios()
      .then((res) => {
        return (
          res
            .map((it: any) => {
              return {
                value: it.idIdioma,
                label: it.NombresIdiomasAdicionales,
              };
            })
            // Filtrar objetos que tienen value o label nulos
            .filter((item: { value: any; label: any }) => item.value !== null && item.label !== null)
        );
      });
    valoresDeRegresoIdiomas.push(...idiomasUsuarios);

    const todasLasHabilidadesBlandas = await estudianteService
      .fetchTodasLasHabilidadesBlandas()
      .then((res) => {
        return res.map((it: any) => {
          return {
            value: it.IdHabilidadesBlandas,
            label: it.NombresHabilidadesBlandas,
          };
        });
      });
    datosInicialHabilidadesBlandas.push(...todasLasHabilidadesBlandas);

    const habilidadesUsuarios = await estudianteService
      .fetchHabilidadesBlandasUsuarios()
      .then((res) => {
        return (
          res
            .map((it: any) => {
              return {
                value: it.IdHabilidadesBlandas,
                label: it.NombresHabilidadesBlandas,
              };
            })
            // Filtrar objetos que tienen value o label nulos
            .filter((item: { value: any; label: any }) => item.value !== null && item.label !== null)
        );
      });

      valoresDeRegresoHabilidadesBlandas.push(...habilidadesUsuarios);

    const todasLasHabilidadesDuras = await estudianteService
      .fetchTodosLosIdiomas()
      .then((res) => {
        return res.map((it: any) => {
          return {
            value: it.idHabilidadesDuras,
            label: it.NombresHabilidadesDuras,
          };
        });
      });
    datosInicialHabilidadesDuras.push(...todasLasHabilidadesDuras);

    const habilidadesDuras = await estudianteService
      .fetchHabilidadesDurasUsuarios()
      .then((res) => {
        return (
          res
            .map((it: any) => {
              return {
                value: it.idHabilidadesDuras,
                label: it.NombresHabilidadesDuras,
              };
            })
            .filter((item: { value: any; label: any }) => item.value !== null && item.label !== null)
        );
      });
    valoresDeRegresoHabilidadesDuras.push(...habilidadesDuras);

    estudianteService.fetchEstudiante(idEstudiante);
    estudiante.subscribe((valor) => {
      if (valor) {
        formData = { ...valor };
      }
    });

    // No olvides cancelar la suscripción
  });

  // Función para manejar el envío del formulario
  async function enviarFormulario(event: Event) {
    event.preventDefault();

    if (formData) {
      await estudianteService.handleSubmit(formData);
    }

    const formIdiomas = {
      idEstudiante: formData.idEstudiante,
      valores: valoresDeRegresoIdiomas
        ? valoresDeRegresoIdiomas.map((it) => it.label)
        : [],
    };

    const formHabilidadesBlandas = {
      idEstudiante: formData.idEstudiante,
      valores: valoresDeRegresoHabilidadesBlandas
        ? valoresDeRegresoHabilidadesBlandas.map((it) => it.label)
        : [],
    };

    const formHabilidadesDuras = {
      idEstudiante: formData.idEstudiante,
      valores: valoresDeRegresoHabilidadesDuras
        ? valoresDeRegresoHabilidadesDuras.map((it) => it.label)
        : [],
    };
    estudianteService.enviarSelects(formIdiomas, 1);
    estudianteService.enviarSelects(formHabilidadesBlandas, 2);
    estudianteService.enviarSelects(formHabilidadesDuras, 3);
  }

  // Funciones para manejar cambios en los campos del formulario
  function handleInputChange(event: Event, field: keyof Estudiante) {
    const target = event.target as HTMLInputElement;
    formData = { ...formData, [field]: target.value };
  }

  // Función para manejar la subida de archivos
  async function handleFileUploadText(
    event: Event,
    field: "foto" | "curriculum",
  ) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (!file || !formData) return;

    const fileUrl = await estudianteService.handleFileUpload(
      file,
      field,
      formData.idEstudiante,
    );
    console.log("🚀 ~ fileUrl:", fileUrl);

    if (fileUrl) {
      // Actualizar formData con la nueva URL
      formData = { ...formData, [field]: fileUrl };
    }
  }
</script>

{#if $loading}
  <p>Cargando datos del estudiante...</p>
{:else if $error}
  <p class="error">Error: {$error}</p>
{:else if $estudiante}
  <div class="estudiante-info">
    <div class="container py-5">
      <div class="card p-3">
        <section class="section about-section gray-bg" id="about">
          <form id="editUserForm" onsubmit={enviarFormulario}>
            <div class="container">
              {#if $submitSuccess}
                <div class="alert alert-success" role="alert">
                  ¡Datos actualizados correctamente!
                </div>
              {/if}
              {#if $submitError}
                <div class="alert alert-danger" role="alert">
                  {$submitError}
                </div>
              {/if}
              <div class="row align-items-center flex-row-reverse">
                <div class="col-lg-6">
                  <div class="about-text go-to">
                    <h3 class="dark-color text-primary">Editar perfil</h3>

                    <div class="">
                      <p class=" text-secondary fs-6 fw-bold">Encabezado</p>
                      <div data-mdb-input-init="" class="form-outline">
                        <label class="form-label" for="puestoDeseado"
                          >Puesto Deseado</label
                        >
                        <input
                          type="text"
                          id="puestoDeseado"
                          class="form-control form-control"
                          value={formData?.puestoDeseado || ""}
                          oninput={(e) => handleInputChange(e, "puestoDeseado")}
                        />
                      </div>

                      <div data-mdb-input-init="" class="form-outline">
                        <label class="form-label" for="descripcion"
                          >Descripcion</label
                        >
                        <textarea
                          class="form-control"
                          name="descripcion"
                          id="descripcion"
                          rows="3"
                          value={formData?.descripcion || ""}
                          oninput={(e) => handleInputChange(e, "descripcion")}
                        ></textarea>
                      </div>
                    </div>
                    <div class="row about-list">
                      <p class=" text-secondary fs-6 fw-bold">
                        Datos personales
                      </p>
                      <div class="col-md-6">
                        <div data-mdb-input-init="" class="form-outline">
                          <label class="form-label" for="codigoAlumno"
                            >Codigo Alumno</label
                          >
                          <input
                            type="text"
                            id="codigoAlumno"
                            class="form-control form-control"
                            readonly
                            value={formData?.codigoAlumno || ""}
                          />
                        </div>
                        <div data-mdb-input-init="" class="form-outline">
                          <label class="form-label" for="correo">Correo</label>
                          <input
                            type="text"
                            id="correo"
                            class="form-control form-control"
                            value={formData?.correo || ""}
                            oninput={(e) => handleInputChange(e, "correo")}
                          />
                        </div>
                        <div data-mdb-input-init="" class="form-outline">
                          <label class="form-label" for="telefono"
                            >Telefono</label
                          >
                          <input
                            type="text"
                            id="telefono"
                            class="form-control form-control"
                            value={formData?.telefono || ""}
                            oninput={(e) => handleInputChange(e, "telefono")}
                          />
                        </div>
                        <div data-mdb-input-init="" class="form-outline">
                          <label class="form-label" for="carrera">carrera</label
                          >

                          <select
                            id="carrera"
                            value={formData?.carrera}
                            oninput={(e) => handleInputChange(e, "carrera")}
                            class="form-select"
                          >
                            <option value="">No especificado</option>
                            {#each carreraEnum as carrera}
                              <option value={carrera}>{carrera}</option>
                            {/each}
                          </select>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div data-mdb-input-init="" class="form-outline">
                          <label class="form-label" for="nombre">Nombre</label>
                          <input
                            type="text"
                            id="nombre"
                            class="form-control form-control"
                            value={formData?.nombre || ""}
                            oninput={(e) => handleInputChange(e, "nombre")}
                          />
                        </div>
                        <div data-mdb-input-init="" class="form-outline">
                          <label class="form-label" for="apellidoPaterno"
                            >Apellido Paterno</label
                          >
                          <input
                            type="text"
                            id="apellidoPaterno"
                            class="form-control form-control"
                            value={formData?.apellidoPaterno || ""}
                            oninput={(e) =>
                              handleInputChange(e, "apellidoPaterno")}
                          />
                        </div>
                        <div data-mdb-input-init="" class="form-outline">
                          <label class="form-label" for="apellidoMaterno"
                            >Apellido Materno</label
                          >
                          <input
                            type="text"
                            id="apellidoMaterno"
                            class="form-control form-control"
                            value={formData?.apellidoMaterno || ""}
                            oninput={(e) =>
                              handleInputChange(e, "apellidoMaterno")}
                          />
                        </div>
                        <div data-mdb-input-init="" class="form-outline">
                          <label class="form-label" for="carrera">carrera</label
                          >

                          <select
                            id="carrera"
                            value={formData?.estatus}
                            oninput={(e) => handleInputChange(e, "estatus")}
                            class="form-select"
                          >
                            <option value="">No especificado</option>
                            {#each estatusEnum as estatus}
                              <option value={estatus}>{estatus}</option>
                            {/each}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="about-avatar">
                    <img
                      src={photoUrl + formData?.foto ||
                        "https://bootdey.com/img/Content/avatar/avatar7.png"}
                      title="Foto de perfil"
                      alt="Foto de perfil"
                      class="img-fluid w-50"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="fotoInput" class="form-label"
                      >Cambiar foto de perfil</label
                    >
                    <input
                      type="file"
                      class="form-control"
                      name="foto"
                      id="fotoInput"
                      accept="image/*"
                      oninput={(e) => handleFileUploadText(e, "foto")}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="cvInput" class="form-label"
                      >Subir Curriculum</label
                    >
                    <input
                      type="file"
                      class="form-control"
                      name="curriculum"
                      id="cvInput"
                      accept=".pdf,.doc,.docx"
                      oninput={(e) => handleFileUploadText(e, "curriculum")}
                    />
                    {#if formData?.curriculum}
                      <small class="form-text text-muted">
                        Curriculum actual: <a
                          href={photoUrl + formData?.curriculum}
                          target="_blank">Ver curriculum</a
                        >
                      </small>
                    {/if}
                  </div>
                </div>
                <div class="w-100 d-flex flex-column">
                  <p>SkillSoft</p>
                  <MultiSelectComponent
                    bind:items={datosInicialHabilidadesBlandas}
                    bind:value={valoresDeRegresoHabilidadesBlandas}
                  />
                </div>
                <div class="w-100 d-flex flex-column">
                  <p>HardSkills</p>
                  <MultiSelectComponent
                    bind:items={datosInicialHabilidadesDuras}
                    bind:value={valoresDeRegresoHabilidadesDuras}
                  />
                </div>
                <div class="w-100 d-flex flex-column">
                  <p>Idiomas</p>
                  <MultiSelectComponent
                    bind:items={datosInicialIdiomas}
                    bind:value={valoresDeRegresoIdiomas}
                  />
                </div>
                <div class="w-100 d-flex justify-content-end">
                  <button
                    type="submit"
                    class="btn btn-primary btn-lg mt-4"
                    disabled={$submitting}
                  >
                    {$submitting ? "Guardando..." : "Modificar"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>
{:else}
  <p>No hay datos disponibles</p>
{/if}
