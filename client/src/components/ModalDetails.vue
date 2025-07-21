<script setup>
import { ref, watch } from 'vue';
import { listarRecordsPorDataset } from '../service/datasetService.js';
import InteractiveSearchBar from './InteractiveSearchBar.vue';

const props = defineProps({
    datasetId: Number,
    show: Boolean,
});

const emit = defineEmits(['close']);

const records = ref([]);
const loading = ref(false);
const error = ref(null);


watch(() => props.show, async (val) => {
    if (val && props.datasetId) {
        loading.value = true;
        error.value = null;
        try {
            records.value = await listarRecordsPorDataset(props.datasetId);
        } catch {
            error.value = 'Erro ao carregar registros';
        } finally {
            loading.value = false;
        }
    }
});

const formatarValor = (chave, valor) => {
  if (typeof chave === 'string' && chave.includes('criado_em')) {
    return new Date(valor).toLocaleString('pt-BR');
  }
  if (typeof valor === 'boolean') {
    return valor ? 'Sim' : 'Não';
  }
  if (valor === null || valor === undefined) {
    return '-';
  }
  if (typeof valor === 'object') {
    return JSON.stringify(valor);
  }
  
  return valor;
};


const close = () => {
    emit('close');
};
</script>

<template>
    <teleport to="body">
        <div v-if="show" class="modal-overlay" @click.self="close">
            <div class="modal-content">
                <button class="modal-close" @click="close">×</button>
                <h2>Detalhes do Dataset {{ datasetId }}</h2>

                <div v-if="loading">Carregando...</div>
                <div v-if="error">{{ error }}</div>

                <table v-if="!loading && !error && records.length">
                    <thead>
                        <tr>
                            <th v-for="(key, idx) in Object.keys(records[0])" :key="idx">{{ key }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(record, idx) in records" :key="idx">
                            <td v-for="[key, value] in Object.entries(record)" :key="key">
                                {{ formatarValor(key, value) }}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div v-if="!loading && records.length === 0">Nenhum registro encontrado.</div>
            </div>
        </div>
    </teleport>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: var(--primary);
    padding: 1rem;
    max-height: 80vh;
    overflow-y: auto;
    border-radius: 8px;
    width: 90%;
    position: relative;
}

.modal-content table {
    width: 100%;
    border-collapse: collapse;
}

.modal-content th,
.modal-content td {
    text-align: left;
    padding: 0.5rem 0.75rem;
    border-bottom: 1px solid #ddd;
    vertical-align: top;
}

.modal-close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    border: none;
    background: none;
    font-size: 1.5rem;
    cursor: pointer;
}
</style>