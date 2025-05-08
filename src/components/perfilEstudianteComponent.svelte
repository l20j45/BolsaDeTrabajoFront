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


	let formData: Estudiante;
	const estudianteService = new EstudianteService();

	onMount(() => {
		let idEstudiante= localStorage.getItem("idUsuario");
		
		estudianteService.fetchEstudiante(idEstudiante);
	});

	// Inicializar formData cuando $estudiante cambie
	$: if ($estudiante) {
		formData = { ...$estudiante };
	}
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
