<script lang="ts">
    import {
        TableHandler,
        Datatable,
        ThSort,
        ThFilter,
        Th,
    } from "@vincjo/datatables";
    import { PersonalService } from "../utils/services";
    import { onMount } from "svelte";

    const personalService = new PersonalService();
    let data = [];
    let table: TableHandler | undefined;
    let view: any;

    onMount(async () => {
        data = await personalService.fetchTodosLosAlumnos();
        console.log("🚀 ~ onMount ~ data:", data);
        // Creamos la instancia de TableHandler después de obtener los datos
        table = new TableHandler(data, { rowsPerPage: 10 });
        view = table.createView([
            { index: 0, name: "foto", isVisible: true },
            { index: 1, name: "codigoAlumno", isVisible: true },
            { index: 2, name: "apellidoMaterno", isVisible: true },
            { index: 3, name: "apellidoPaterno", isVisible: true },
            { index: 4, name: "nombre", isVisible: true },
            { index: 5, name: "carrera", isVisible: true },
            { index: 6, name: "correo", isVisible: true },
            { index: 7, name: "puestoDeseado", isVisible: true },
            { index: 8, name: "idiomas", isVisible: true },
            { index: 9, name: "habilidadesDuras", isVisible: true },
            { index: 10, name: "habilidadesBlandas", isVisible: true },
        ]);
    });
</script>

{#if table}
    {#each view.columns as column}
        <button
            type="button"
            class={{ active: column.isVisible }}
            onclick={() => column.toggle()}
        >
            {column.name}
        </button>
    {/each}
    <Datatable basic {table}>
        <table>
            <thead>
                <tr>
                    <ThSort {table} field="foto">Imagen</ThSort>
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
                    <ThSort {table} field="puestoDeseado">Puesto deseado</ThSort
                    >
                    <ThSort {table} field="idiomas">idiomas</ThSort>
                    <ThSort {table} field="habilidadesDuras"
                        >habilidades Duras</ThSort
                    >
                    <ThSort {table} field="habilidadesBlandas"
                        >habilidadesBlandas</ThSort
                    >
                    <Th>Revisar esto</Th>
                
                </tr>
                <tr>
                    <ThFilter {table} field="foto" />
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
            <tbody>
                {#each table.rows as row}
                    <tr>
                        <td>
                            <img
                                src={row.foto}
                                alt="Imagen de perfil"
                                style="width: 50px; height: 50px; border-radius: 50%;"
                            />
                        </td>
                        <td>{row.codigoAlumno}</td>
                        <td>{row.apellidoMaterno}</td>
                        <td>{row.apellidoPaterno}</td>
                        <td>{row.nombre}</td>
                        <td>{row.carrera}</td>
                        <td>{row.correo}</td>
                        <td>{row.puestoDeseado}</td>
                        <td>{row.idiomas}</td>
                        <td>{row.habilidadesDuras}</td>
                        <td>{row.habilidadesBlandas}</td>
                        <td><button class="btn btn-primary" onclick={() => console.log(row.habilidadesDuras)}> Revisar</button></td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </Datatable>
{/if}
