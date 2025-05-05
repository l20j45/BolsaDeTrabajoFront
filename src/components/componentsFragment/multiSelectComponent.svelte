<script>
    import Select from 'svelte-select';

    // Recibimos los items por props y hacemos que sea exportable para el bind
    export let items;
    let filterText = '';
    let value = null;

    function handleFilter(e) {        
        if (value?.find(i => i.label === filterText)) return;
        if (e.detail.length === 0 && filterText.length > 0) {
            const prev = items.filter((i) => !i.created);
            // Actualizamos los items con el nuevo elemento
            items = [...prev, { value: filterText, label: filterText, created: true }];
        }
    }
    
    function handleChange(e) {
        // Actualizamos los items eliminando la propiedad created
        items = items.map((i) => {
            delete i.created;
            return i;
        });
    }
</script>

<Select on:change={handleChange} multiple on:filter={handleFilter} bind:filterText bind:value {items}>
    <div slot="item" let:item>
        {item.created ? 'Add new: ' : ''}
        {item.label}
    </div>
</Select>