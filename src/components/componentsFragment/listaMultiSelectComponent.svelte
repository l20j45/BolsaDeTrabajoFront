<script>
	let { items, title = "PlaceHolder" } = $props();
	console.log("🚀 ~ items:", items)
	
</script>

<div class="container">
	<h4>{title}</h4>
	<div class="lista-personalizada">
		{#if items.length === 0}
			<p>No hay elementos disponibles</p>
		{:else if items.length > 0}
		{#each items as item}
		<span>
			{item.label}
		</span>
	{/each}
		{/if}

	</div>
</div>

<style>
	.lista-personalizada {
		display: flex;
		flex-wrap: wrap; 
		gap: 10px;
		
	}
	.lista-personalizada span:nth-child(odd) {
		background-color: #ab0033; 
	}
	.lista-personalizada span:nth-child(even) {
		background-color: #33344f; 
		
	}

	.lista-personalizada span {
		margin-right: 3rem;
		padding: 10px;
		margin: 5px 0;
		border-radius: 5px;
		color: white;
		font-weight: bold;
		list-style-type: none; /* Elimina los puntos de la lista */
	}
</style>
