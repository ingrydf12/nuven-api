<script setup>
import TextField from '../components/TextField.vue';
import { ref } from 'vue';
import { askAPI } from '../service/queriesService.js';

const searchQuery = ref('');
const datasetId = ref(null);
const results = ref([]);

const performSearch = async () => {
    const query = searchQuery.value.trim();
    if (!query) return;
    try {
        const res = await askAPI(query, datasetId.value);
        results.value = res;
        console.log("Resultados da pesquisa:", res);
    } catch (error) {
        console.error('Erro ao buscar resultados:', error);
        results.value = [];
    }
};



</script>

<template>
    <div class="interface-ai">
        <div class="interface-hugging-search">
            <h1>Hugging Search</h1>
            <h3>Pesquisas rápidas com a nossa IA.</h3>
            <div class="search-bar">
                <TextField v-model="datasetId" placeholder="ID do Dataset" />
                <TextField v-model="searchQuery" placeholder="Digite sua consulta" />
                <button @click="performSearch" class="btn-primary">Pesquisar</button>
            </div>
        </div>
        <div class="results">
            <h2>Resultados</h2>
            <ul>
                <li v-for="result in results" :key="result.id">
                    <strong>Pergunta:</strong> {{ result.pergunta || 'Consulta' }}<br />
                    <strong>Resposta:</strong> {{ result.resposta || '(sem resposta)' }}
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.interface-ai {
    display: flex;
    flex-direction: row;
    align-items: top;
    padding: 1em 0;
    gap: 1.5rem;
    background-color: var(--background);
}

.interface-hugging-search {
    display: flex;
    flex-direction: column;
    padding: 1em;
    background-color: var(--primary);
    border-radius: 8px;
    width: 50%;
    gap: 0.5rem;
}

.interface-hugging-search h1 {
    font-size: 1.5em;
    margin-bottom: 0.5em;
    color: var(--text-sec);
}

.interface-hugging-search button {
    margin-top: 1em;
    background-color: var(--secondary);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.5em 1em;
    cursor: pointer;
}

.search-bar {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
}

.results ul {
    padding: 0;
    margin: 1em 0;
    background-color: var(--background);
    border-radius: 8px;
}

.results li {
    list-style: none;
    padding: 0.5em 0;
    border-bottom: 1px solid var(--border);
}
</style>