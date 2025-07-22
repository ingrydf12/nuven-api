<script setup>
import { ref, onMounted } from 'vue';
import InteractiveSearchBar from '../components/InteractiveSearchBar.vue';
import RightBar from '../components/RightBar.vue';
import { listarDataset } from '../service/datasetService.js';
import ModalDetails from '../components/ModalDetails.vue';
import { pesquisarRegistros } from '../service/recordsService.js';
import InterfaceHuggingSearch from '../components/InterfaceHuggingSearch.vue';

const datasets = ref([]);
const selectedDatasetId = ref(null);
const showModal = ref(false);

const pesquisaQuery = async (query) => {
    if (!query.trim()) {
        datasets.value = await listarDataset();
        return;
    }
    try {
        const results = await pesquisarRegistros(query);
        datasets.value = results;
    } catch (error) {
        console.error('Erro ao pesquisar datasets:', error);
    }
};

const listaDatasets = async () => {
    datasets.value = await listarDataset();
};

onMounted(() => {
    listaDatasets();
});

const viewDataset = (id) => {
    selectedDatasetId.value = id;
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};


</script>

<template>
    <div class="my-datasets-page">
        <h1>Meus Datasets</h1>
        <InteractiveSearchBar @atualizarResultados="pesquisaQuery" />

        <div class="datasets-list">
            <table class="datasets-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome do arquivo</th>
                        <th>Tipo</th>
                        <th>Envio</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody v-if="datasets.length === 0">
                    <tr>
                        <td colspan="4">Nenhum dataset encontrado.</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr v-for="dataset in datasets" :key="dataset.id">
                        <td>{{ dataset.id }}</td>
                        <td>{{ dataset.nome || dataset.dataset?.nome || '—' }}</td>
                        <td>{{ (dataset.nome || dataset.dataset?.nome)?.split('.').pop().toUpperCase() || '—' }}</td>
                        <td>{{ new Date(dataset.criado_em).toLocaleString() }}</td>
                        <td>
                            <button @click="viewDataset(dataset.id)">Visualizar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <ModalDetails :datasetId="selectedDatasetId" :show="showModal" @close="closeModal" />
        </div>
        <InterfaceHuggingSearch />

        <RightBar />
    </div>
</template>

<style scoped>
.my-datasets-page {
    padding: 1rem;
    gap: 1rem;
}

.datasets-list {
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.datasets-table {
    width: 60%;
    flex: 1;
    border-collapse: collapse;
}

.datasets-table th,
.datasets-table td {
    border: 1px solid #ddd;
    padding: 8px;
    color: var(--text-color);
}

.datasets-table td {
    gap: 0.5rem;
}

.datasets-table th {
    background-color: var(--primary);
    color: var(--text-sec);
}
</style>