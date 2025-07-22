<script setup>
import { ref } from 'vue';

const props = defineProps({
    datasetId: [String, Number],
});

const emit = defineEmits(['atualizarResultados']);

const searchQuery = ref('');

const performSearch = async () => {
    const query = searchQuery.value.trim();
    if (!query) return;
    emit('atualizarResultados', query);
};

</script>

<template>
    <div class="interactive-search-bar">
        <input type="text" v-model="searchQuery" placeholder="Busque por documentos, datasets..." />
        <button @click="performSearch">Buscar</button>
    </div>
</template>


<style scoped>
.interactive-search-bar {
    display: flex;
    align-items: center;
    gap: 1em;
    background-color: var(--background);
    max-width: 50%;
}

.interactive-search-bar button {
    background-color: var(--secondary);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 1em 1.5em;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.interactive-search-bar input {
    width: 100%;
    padding: 0.8em 1.2em;
    border: 1px solid var(--primary);
    border-radius: 4px;
    font-size: 1em;
    box-sizing: border-box;
}

.interactive-search-bar button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.interactive-search-bar button:hover:enabled {
    filter: brightness(90%);
}
</style>