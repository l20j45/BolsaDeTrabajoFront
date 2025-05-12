<script>
    import { fade } from 'svelte/transition';
    export let showModal = false;
    export let student = null;

    function closeModal() {
        showModal = false;
    }

    function handleKeydown(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    }
</script>

<svelte:window on:keydown={handleKeydown}/>

{#if showModal}
    <div class="modal-overlay" transition:fade={{ duration: 150 }}>
        <div class="modal-container" transition:fade={{ duration: 200 }}>
            <div class="modal-header">
                <slot name="header">
                    <h2>Modal</h2>
                </slot>
                <button class="close-btn" on:click={closeModal}>&times;</button>
            </div>
            <div class="modal-body">
                <slot />
            </div>
            <div class="modal-footer">
                <slot name="footer">
                    <button on:click={closeModal}>Cerrar</button>
                </slot>
            </div>
        </div>
    </div>
{/if}

<style>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-container {
        background-color: #191a1b;
        padding: 0;
        border-radius: 8px;
        width: 80%;
        max-width: 800px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        border-bottom: 1px solid #eee;
    }

    .modal-body {
        padding: 20px;
    }

    .modal-footer {
        padding: 15px 20px;
        border-top: 1px solid #eee;
        display: flex;
        justify-content: flex-end;
    }

    .close-btn {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        color: #999;
    }

    .close-btn:hover {
        color: #333;
    }

    button {
        padding: 8px 16px;
        background-color: #4a5568;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background-color: #2d3748;
    }
</style>