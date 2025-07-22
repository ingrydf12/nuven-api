<script setup>
import { ref, onMounted } from 'vue';
import { listarQueries } from '../service/queriesService';

const historyRecords = ref([]);

const fetchHistory = async () => {
  try {
    const data = await listarQueries();

    if (!data || (Array.isArray(data) && data.length === 0)) {
      historyRecords.value = [];
      return;
    }

    historyRecords.value = data;
  } catch (error) {
    console.error('Erro ao carregar histórico de consultas:', error);
  }
};

const formatterData = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

onMounted(fetchHistory);
</script>

<template>
    <div class="my-history-page">
        <h1>Meu Histórico de Consultas</h1>
        <div class="history-list">
            <table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Pergunta</th>
                        <th>Resposta</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="historyRecords.length === 0">
                        <td colspan="3">Nenhuma consulta registrada.</td>
                    </tr>
                    <tr v-for="(registro, index) in historyRecords" :key="index">
                        <td>{{ formatterData(registro.criado_em) }}</td>
                        <td>{{ registro.pergunta }}</td>
                        <td>{{ registro.resposta }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.my-history-page {
    padding: 2em;
    background-color: var(--background);
}
.my-history-page h1 {
    font-size: 2em;
    margin-bottom: 1em;
    color: var(--text-color);
}
.my-history-page p {
    font-size: 1.2em;
    color: var(--text-color);
}
.my-history-page .history-list {
    margin-top: 1em;
    background-color: var(--card-background);
    padding: 1em;
    border-radius: 8px;
}

.my-history-page table {
    border-collapse: collapse;
}

.my-history-page th, .my-history-page td {
    padding: 0.5em;
    border-bottom: 2px solid var(--secondary);
}


</style>