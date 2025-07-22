<script setup>
import { ref, watch } from 'vue';
import { listarRecordsPorDataset } from '../service/datasetService.js';

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
  return valor;
};

const close = () => emit('close');
</script>

<template>
  <teleport to="body">
    <div v-if="show" class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <button class="modal-close" @click="close">×</button>
        <h2>Detalhes do Dataset {{ datasetId }}</h2>

        <div v-if="loading">Carregando...</div>
        <div v-if="error">{{ error }}</div>

        <div v-if="!loading && !error && records.length">
          <div v-for="(record, idx) in records" :key="idx" class="record-bloco">
            <p><strong>ID:</strong> {{ record.id }}</p>
            <p><strong>Dataset ID:</strong> {{ record.dataset_id }}</p>
            <p><strong>Criado em:</strong> {{ formatarValor('criado_em', record.criado_em) }}</p>

            <div class="dados-json">
              <div
                v-for="(linha, index) in record.dados_json"
                :key="index"
                class="linha-json"
              >
                <div
                  v-for="(valor, chave) in linha"
                  :key="chave"
                  class="par-chave-valor"
                >
                  <span class="chave">{{ chave || '(vazio)' }}:</span>
                  <span class="valor">{{ formatarValor(chave, valor) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

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
  color: var(--text-sec);
  padding: 1rem;
  max-height: 80vh;
  overflow-y: auto;
  border-radius: 8px;
  width: 90%;
  position: relative;
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

.record-bloco {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.dados-json {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.linha-json {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 4px;
}

.par-chave-valor {
  min-width: 200px;
  font-size: 0.9rem;
}

.chave {
  font-weight: bold;
  margin-right: 4px;
}
</style>
