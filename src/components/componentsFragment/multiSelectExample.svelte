<script lang="ts">
  import TestComponent from "./multiSelectComponent.svelte";

  let items = [
    { value: 1, label: "name 1" },
    { value: 2, label: "name 2" },
    { value: 3, label: "name 3" },
    { value: 4, label: "name 4" },
    { value: 5, label: "name 5" },
  ];

  let datosEnviar = $state(items);

  let items2 = [
    { value: 6, label: "name 6" },
    { value: 7, label: "name 7" },
    { value: 8, label: "name 8" },
    { value: 9, label: "name 9" },
    { value: 10, label: "name 10" },
  ];


  let datosEnviar2 = $state(items2);

  $inspect(datosEnviar)
</script>

<TestComponent bind:items={datosEnviar} />
<p>Aqui es el padre</p>
{datosEnviar ? datosEnviar.map((i) => i.label).join(", ") : "No value"}

<TestComponent bind:items={datosEnviar2} />
<p>Aqui es el padre</p>
{datosEnviar2 ? datosEnviar2.map((i) => i.label).join(", ") : "No value"}

