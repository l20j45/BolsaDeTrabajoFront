<script lang="ts">
    import {
        TableHandler,
        Datatable,
        ThSort,
        ThFilter,
    } from "@vincjo/datatables";
    import { PersonalService } from "../utils/services";
    import { onMount } from "svelte";

    import { photoUrl } from "../utils/data";

    import Modal from "./componentsFragment/modal.svelte";

    let showModal = false;
    let selectedStudent: {
        foto: string;
        codigoAlumno: string;
        apellidoMaterno: string;
        apellidoPaterno: string;
        nombre: string;
        carrera: string;
        correo: string;
        puestoDeseado: string;
        idiomas: string;
        habilidadesDuras: string;
        habilidadesBlandas: string;
        telefono: string;
        curriculum: string;
    } | null = null;

    const personalService = new PersonalService();
    let data = [];
    let table: TableHandler | undefined;
    let view: any;

    onMount(async () => {
        data = await personalService.fetchTodosLosAlumnos();
        console.log("🚀 ~ onMount ~ data:", data);

        table = new TableHandler(data, { rowsPerPage: 10 });
        view = table.createView([
            { index: 0, name: "codigoAlumno", isVisible: true },
            { index: 1, name: "apellidoMaterno", isVisible: true },
            { index: 2, name: "apellidoPaterno", isVisible: true },
            { index: 3, name: "nombre", isVisible: true },
            { index: 4, name: "carrera", isVisible: false },
            { index: 5, name: "correo", isVisible: false },
            { index: 6, name: "puestoDeseado", isVisible: true },
            { index: 7, name: "idiomas", isVisible: false },
            { index: 8, name: "habilidadesDuras", isVisible: false },
            { index: 9, name: "habilidadesBlandas", isVisible: true },
            { index: 10, name: "botonVerAlumnos", isVisible: true },
        ]);
    });

    function openModal(student: typeof selectedStudent) {
        selectedStudent = student;
        showModal = true;
    }
</script>

{#if table}
    <div
        class="d-flex flex-column justify-content-center align-content-center mt-5"
    >
        <h4 class="text-center">Filtros de la tabla</h4>
        <div class="d-flex justify-content-center align-items-center gap-1">
            {#each view.columns as column}
                <button
                    type="button"
                    class="btn btn-primary"
                    class:btn-secondary={!column.isVisible}
                    on:click={() => column.toggle()}
                >
                    {column.name}
                </button>
            {/each}
        </div>
    </div>
    <div class="table-container mt-5">
        <Datatable basic {table}>
            <table>
                <thead>
                    <tr>
                        <ThSort {table} field="codigoAlumno">Codigo</ThSort>
                        <ThSort {table} field="apellidoMaterno"
                            >Apellido Materno</ThSort
                        >
                        <ThSort {table} field="apellidoPaterno"
                            >Apellido Paterno</ThSort
                        >
                        <ThSort {table} field="nombre">Nombre</ThSort>
                        <ThSort {table} field="carrera">Carrera</ThSort>
                        <ThSort {table} field="correo">correo</ThSort>
                        <ThSort {table} field="puestoDeseado"
                            >Puesto deseado</ThSort
                        >
                        <ThSort {table} field="idiomas">idiomas</ThSort>
                        <ThSort {table} field="habilidadesDuras"
                            >habilidades Duras</ThSort
                        >
                        <ThSort {table} field="habilidadesBlandas"
                            >habilidadesBlandas</ThSort
                        >
                        <ThSort {table} field="habilidadesBlandas"
                            >Revisar esto</ThSort
                        >
                    </tr>
                    <tr>
                        <ThFilter {table} field="codigoAlumno" />
                        <ThFilter {table} field="apellidoMaterno" />
                        <ThFilter {table} field="apellidoPaterno" />
                        <ThFilter {table} field="nombre" />
                        <ThFilter {table} field="carrera" />
                        <ThFilter {table} field="correo" />
                        <ThFilter {table} field="puestoDeseado" />
                        <ThFilter {table} field="idiomas" />
                        <ThFilter {table} field="habilidadesDuras" />
                        <ThFilter {table} field="habilidadesBlandas" />
                    </tr>
                </thead>
                <tbody class="dataRow">
                    {#each table.rows as row}
                        <tr>
                            <td>{row.codigoAlumno}</td>
                            <td>{row.apellidoMaterno}</td>
                            <td>{row.apellidoPaterno}</td>
                            <td>{row.nombre}</td>
                            <td>{row.carrera !== null ? row.carrera : "no registro nada"}</td>
                            <td>{row.correo}</td>
                            <td>{row.puestoDeseado !==null ? row.puestoDeseado : "no registro esto"}</td>
                            <td>{row.idiomas !==null ? row.Idiomas : "no hay idiomas"}</td>
                            <td>{row.habilidadesDuras !==null ? row.habilidadesDuras : "no hay Habilidades para mostrar"}</td>
                            <td>{row.habilidadesBlandas !==null ? row.habilidadesBlandas : "no hay Habilidades para mostrar"}</td>

                            <td>
                                <button
                                    class="btn btn-info"
                                    on:click={() => openModal(row)}
                                    >Ver detalles</button
                                >
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </Datatable>
    </div>
{/if}

<Modal bind:showModal student={selectedStudent}>
    {#snippet header()}
        <h2>Detalles del Estudiante</h2>
    {/snippet}

    {#if selectedStudent}
        <div class="student-details">
            <div class="student-header">
                {#if selectedStudent.foto}
                    <img
                        src={photoUrl + selectedStudent.foto}
                        alt="Foto de perfil"
                        style="width: 100px; height: 100px; border-radius: 50%;"
                    />
                {:else}
                    <div
                        class="d-flex justify-content-center align-items-center"
                    >
                        <span style="width: 100px; height: 100px; border-radius: 50%; background-color: #ddd; display: flex; justify-content: center; align-items: center; font-size: 2em; color: #888;">?</span>
                    </div>
                {/if}

                <h3>
                    {selectedStudent.nombre}
                    {selectedStudent.apellidoPaterno}
                    {selectedStudent.apellidoMaterno}
                </h3>
                <p class="student-code">
                    Código: {selectedStudent.codigoAlumno}
                </p>
            </div>

            <div class="student-info">
                <div class="info-section">
                    <h4>Información General</h4>
                    <p><strong>Carrera:</strong> {selectedStudent.carrera !== null ? selectedStudent.carrera : "Dato no ingresado"}</p>
                    <p>
                        <strong>Correo:</strong>
                        <a
                            href="mailto:{selectedStudent.correo}?subject=Vacante En el area de vinculacion de Cucea&body=Hola nos gustaria contactarnos contigo para poder ver el tema de una vacante"
                            target="_blank">{selectedStudent.correo}</a
                        >
                    </p>
                    <p>
                        <strong>Telefono:</strong>
                        <a
                            href="https://wa.me/{selectedStudent.telefono}?text=Hola%20somos%20de%20la%20secretaria%20de%20vinculacion%20CUCEA,%20nos%20gustaria%20contactarte%20para%20informarte%20sobre%20una%20vacante%20en%20la%20cual%20cubres%20el%20perfil"
                            target="_blank">{selectedStudent.telefono}</a
                        >
                    </p>

                    <p>
                        <strong>Puesto Deseado:</strong>
                        {selectedStudent.puestoDeseado !== null
                            ? selectedStudent.puestoDeseado
                            : "no hay puesto deseado para mostrar"}
                    </p>
                    <h4>Ver Curriculum</h4>
                    {#if selectedStudent.curriculum}
                        <a
                            href={photoUrl + selectedStudent.curriculum}
                            target="_blank"
                            class="btn btn-primary"
                        >
                            Ver Curriculum
                        </a>
                    {:else}
                        <p>No hay curriculum</p>
                    {/if}
                </div>

                <div class="info-section">
                    <h4>Habilidades e Idiomas</h4>
                    <p><strong>Idiomas:</strong> 
                        {selectedStudent.idiomas  !== null ? selectedStudent.idiomas : "no hay idiomas para mostrar" }</p>
                    <p>
                        <strong>Habilidades Técnicas:</strong>
                        {selectedStudent.habilidadesDuras !== null ? selectedStudent.habilidadesDuras : "no hay habilidades para mostrar"}
                    </p>
                    <p>
                        <strong>Habilidades Blandas:</strong>
                        {selectedStudent.habilidadesBlandas !== null ? selectedStudent.habilidadesBlandas : "no hay habilidades para mostrar"}
                    </p>
                </div>
            </div>
        </div>
    {:else}
        <p>Cargando información del estudiante...</p>
    {/if}
</Modal>

<style>
    .table-container {
        scrollbar-width: thin; /* Para Firefox */
        scrollbar-color: #888 #f1f1f1; /* Para Firefox */
    }
    tbody td {
        color: white;
    }

    tbody tr:hover {
        color: black;
    }

    /* Estilo para las celdas */
    tbody td {
        color: white;
        transition: all 0.3s ease; /* Añade una transición suave */
    }

    /* Estilo para el hover en las filas */
    tbody tr:hover {
        background-color: #7b0606; /* Fondo claro al hacer hover */
        color: black;
    }

    /* Estilo específirgb(109, 7, 7) el hover en las celdas */
    tbody tr:hover td {
        color: black;
        font-weight: 500; /* Texto ligeramente más grueso */
        background-color: rgba(240, 240, 240, 0.8); /* Fondo semitransparente */
    }

    /* Opcional: Estilo para hover individual en cada celda */
    tbody td:hover {
        background-color: #e0e0e0; /* Un color más oscuro cuando se hace hover sobre la celda específica */
        cursor: pointer; /* Cambia el cursor a una mano para indicar interactividad */
    }

    .student-header {
        text-align: center;
        margin-bottom: 20px;
    }
    .student-code {
        color: #666;
        font-size: 0.9em;
    }
    .student-info {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }
    .info-section {
        border: 1px solid #eee;
        border-radius: 5px;
        padding: 30px;
    }
    @media (max-width: 600px) {
        .student-info {
            grid-template-columns: 1fr;
        }
    }
</style>
