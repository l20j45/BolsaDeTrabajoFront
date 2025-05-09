<script lang="ts">
	import { onMount } from "svelte";
	import {
		estudiante,
		loading,
		error,
	} from "../utils/Stores/storeEstudianteService";
	import { EstudianteService } from "../utils/services/estudianteService";
	import type { Estudiante } from "../utils/interfaces/index";
	import PerfilComponent from "./componentsFragment/perfilComponent.svelte";
	let idEstudiante :any ;

	let formData: Estudiante;
	const estudianteService = new EstudianteService();

	onMount(() => {
		idEstudiante = localStorage.getItem("idUsuario");
		if (idEstudiante) {
			estudianteService.fetchEstudiante(Number(idEstudiante));
		}
	});
    estudiante.subscribe((valor) => {
      if (valor) {
        formData = { ...valor };
      }
    });
</script>

{#if $loading}
	<p>Cargando datos del estudiante...</p>
{:else if $error}
	<p class="error">Error: {$error}</p>
{:else if $estudiante}
	<PerfilComponent {formData} />
{:else if $estudiante === null}
	<p>No se encontró el estudiante con ID {idEstudiante}</p>
{:else}
	<p>No hay datos disponibles</p>
{/if}
