<script>
    import Select from "svelte-select";

    let filterText = "";
    export let value = [
        { value: 1, label: "name 1" },
        { value: 2, label: "name 2" },
    ];

    export let items;

    function handleFilter(e) {
        if (value?.find((i) => i.label === filterText)) return;
        if (e.detail.length === 0 && filterText.length > 0) {
            const prev = items.filter((i) => !i.created);
            items = [
                ...prev,
                { value: filterText, label: filterText, created: true },
            ];
        }
    }

    function handleChange(e) {
        items = items.map((i) => {
            delete i.created;
            return i;
        });
    }
</script>

<Select
    class="design"
    on:change={handleChange}
    multiple
    on:filter={handleFilter}
    bind:filterText
    bind:value
    {items}
>
    <div slot="item" let:item>
        {item.created ? "Add new: " : ""}
        {item.label}
    </div>
</Select>

<style>
    :global(.design) {
        background: rgb(255, 255, 255) !important; 
        color: #000000 !important;
        border: 1px solid #495057 !important;
        
    }
</style>