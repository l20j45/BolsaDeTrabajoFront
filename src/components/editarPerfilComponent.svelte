<script lang="ts">
  import { onMount } from "svelte";
  import {
    estudiante,
    loading,
    error,
    fetchEstudiante,
    submitting,
    submitSuccess,
    submitError,
    handleSubmit,
    handleFileUpload,
    fetchEnumData,
    fetchTodosLosIdiomas,

    fetchIdiomasUsuarios

  } from "../utils/services";
  import type { Estudiante } from "../utils/interfaces/index";
  import { photoUrl } from "../utils/data"; // Asegúrate de que la ruta sea correcta
  import MultiSelectComponent from "./componentsFragment/multiSelectComponent.svelte";
  import type { Idioma } from "../utils/interfaces/index";

  // ID del estudiante a cargar
  let idEstudiante: number = 1008;

  // Variable para almacenar los datos del formulario
  let formData: Estudiante;

  // Variable para controlar mensajes de estado del envío
  let carreraEnum: any;
  let estatusEnum: any;
  

  let itemsDefaultSoftSkills = [
    { value: 6, label: "name 6" },
    { value: 7, label: "name 7" },
    { value: 8, label: "name 8" },
    { value: 9, label: "name 9" },
    { value: 10, label: "name 10" },
  ];
  let datosInicialSoftSkills = $state(itemsDefaultSoftSkills);
  let valoresDeRegresoSoftSkills: { value: number; label: string }[] = $state(
    [],
  );

  let itemsDefaultHardSkill = [
    { value: 6, label: "name 6" },
    { value: 7, label: "name 7" },
    { value: 8, label: "name 8" },
    { value: 9, label: "name 9" },
    { value: 10, label: "name 10" },
  ];

  
  let datosInicialHardSkills = $state(itemsDefaultHardSkill);
  let valoresDeRegresoHardSkill: { value: number; label: string }[] = $state(
    [],
  );


  let datosInicialIdiomas = $state<Idioma[]>([]);
  let valoresDeRegresoIdiomas = $state<Idioma[]>([]);

  onMount(async () => {
    carreraEnum = await fetchEnumData("carrera");
    carreraEnum = carreraEnum.split(",").filter((item: string) => item !== "");
    estatusEnum = await fetchEnumData("estatus");
    estatusEnum = estatusEnum.split(",").filter((item: string) => item !== "");
    
    const todosLosIdiomas = await fetchTodosLosIdiomas().then((res) => {
      return res.map((idioma: any) => {
        return { value: idioma.idIdioma, label: idioma.NombresIdiomasAdicionales };
      });
    })
    datosInicialIdiomas.push(...todosLosIdiomas);

    const idiomasUsuarios = await fetchIdiomasUsuarios().then((res) => {
      return res.map((idioma: any) => {
        return { value: idioma.idIdioma, label: idioma.NombresIdiomasAdicionales };
      });
    })
    valoresDeRegresoIdiomas.push(...idiomasUsuarios);
    


    
    fetchEstudiante(idEstudiante);
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
      await handleSubmit(formData);
    }
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

    const fileUrl = await handleFileUpload(file, field, formData.idEstudiante);
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
          <form id="editUserForm" on:submit={enviarFormulario}>
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
                          on:input={(e) =>
                            handleInputChange(e, "puestoDeseado")}
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
                          on:input={(e) => handleInputChange(e, "descripcion")}
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
                            on:input={(e) => handleInputChange(e, "correo")}
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
                            on:input={(e) => handleInputChange(e, "telefono")}
                          />
                        </div>
                        <div data-mdb-input-init="" class="form-outline">
                          <label class="form-label" for="carrera">carrera</label
                          >

                          <select
                            id="carrera"
                            value={formData?.carrera}
                            on:change={(e) => handleInputChange(e, "carrera")}
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
                            on:input={(e) => handleInputChange(e, "nombre")}
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
                            on:input={(e) =>
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
                            on:input={(e) =>
                              handleInputChange(e, "apellidoMaterno")}
                          />
                        </div>
                        <div data-mdb-input-init="" class="form-outline">
                          <label class="form-label" for="carrera">carrera</label
                          >

                          <select
                            id="carrera"
                            value={formData?.estatus}
                            on:change={(e) => handleInputChange(e, "estatus")}
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
                      on:change={(e) => handleFileUploadText(e, "foto")}
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
                      on:change={(e) => handleFileUploadText(e, "curriculum")}
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
                    bind:items={datosInicialSoftSkills}
                    bind:value={valoresDeRegresoSoftSkills}
                  />
                  valoresDeRegresoSoftSkills: {valoresDeRegresoSoftSkills
                    ? valoresDeRegresoSoftSkills.map((i) => i?.label).join(", ")
                    : "No value"}
                </div>
                <div class="w-100 d-flex flex-column">
                  <p>HardSkills</p>
                  <MultiSelectComponent
                    bind:items={datosInicialHardSkills}
                    bind:value={valoresDeRegresoHardSkill}
                  />
                  datosDeRegrvaloresDeRegresoHardSkilleso: {valoresDeRegresoHardSkill
                    ? valoresDeRegresoHardSkill.map((i) => i?.label).join(", ")
                    : "No value"}
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
