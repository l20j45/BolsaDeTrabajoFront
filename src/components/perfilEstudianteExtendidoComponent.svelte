<script lang="ts">
	import { onMount } from "svelte";
	import {
		estudiante,
		loading,
		error,
	} from "../utils/Stores/storeEstudianteService";
	import { EstudianteService } from "../utils/services/estudianteService";
	import type {
		Estudiante,
		habilidadesBlandas,
		habilidadesDuras,
		idioma,
	} from "../utils/interfaces/index";
	import PerfilComponent from "./componentsFragment/perfilComponent.svelte";
	import ListaMultiSelectComponent from "./componentsFragment/listaMultiSelectComponent.svelte";


	let formData: Estudiante;
	const estudianteService = new EstudianteService();

	let valoresDeIdiomas = $state<idioma[]>([]);
	let valoresDeHabilidadesBlandas = $state<habilidadesBlandas[]>([]);
	let valoresDeHabilidadesDuras = $state<habilidadesDuras[]>([]);

	onMount(async () => {
		let idEstudiante= localStorage.getItem("idUsuario");
		const idiomasUsuarios = await estudianteService
			.fetchIdiomasUsuarios(idEstudiante)
			.then((res) => {
				return (
					res
						.map((it: any) => {
							return {
								value: it.idIdioma,
								label: it.nombresIdiomasAdicionales,
							};
						})
						// Filtrar objetos que tienen value o label nulos
						.filter(
							(item: { value: any; label: any }) =>
								item.value !== null && item.label !== null,
						)
				);
			});
		valoresDeIdiomas.push(...idiomasUsuarios);

		const habilidadesUsuarios = await estudianteService
			.fetchHabilidadesBlandasUsuarios(idEstudiante)
			.then((res) => {
				return (
					res
						.map((it: any) => {
							return {
								value: it.idHabilidadesBlandas,
								label: it.nombresHabilidadesBlandas,
							};
						})
						// Filtrar objetos que tienen value o label nulos
						.filter(
							(item: { value: any; label: any }) =>
								item.value !== null && item.label !== null,
						)
				);
			});

		valoresDeHabilidadesBlandas.push(...habilidadesUsuarios);

		const habilidadesDuras = await estudianteService
			.fetchHabilidadesDurasUsuarios(idEstudiante)
			.then((res) => {
				return res
					.map((it: any) => {
						return {
							value: it.idHabilidadesDuras,
							label: it.nombresHabilidadesDuras,
						};
					})
					.filter(
						(item: { value: any; label: any }) =>
							item.value !== null && item.label !== null,
					);
			});
		valoresDeHabilidadesDuras.push(...habilidadesDuras);

		estudianteService.fetchEstudiante(idEstudiante);
		estudiante.subscribe((valor) => {
			if (valor) {
				formData = { ...valor };
			}
		});
	});
</script>

{#if $loading}
	<p>Cargando datos del estudiante...</p>
{:else if $error}
	<p class="error">Error: {$error}</p>
{:else if $estudiante}
	<PerfilComponent {formData}>
		<ListaMultiSelectComponent items={valoresDeIdiomas} title="Idiomas" />
		<ListaMultiSelectComponent items={valoresDeHabilidadesBlandas} title="Habilidades Blandas" />
		<ListaMultiSelectComponent items={valoresDeHabilidadesDuras} title="Habilidades Duras" />
	</PerfilComponent>
{:else if $estudiante === null}
	<p>No se encontró el estudiante con ID {idEstudiante}</p>
{:else}
	<p>No hay datos disponibles</p>
{/if}
