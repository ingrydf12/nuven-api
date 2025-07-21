<script setup>
import { ref } from 'vue';
import { enviarArquivo } from '../service/datasetService.js';

const selectedFile = ref(null);

const handleChange = (e) => {
  selectedFile.value = e.target.files[0];
};

const handleUploadFile = () => {
  if (selectedFile.value) {
    enviarArquivo(selectedFile.value)
      .then((response) => {
        console.log("Arquivo enviado com sucesso:", response);
      })
      .catch((error) => {
        console.error("Erro ao enviar arquivo:", error);
      });
  } else {
    console.error("Nenhum arquivo selecionado.");
  }
};
</script>

<template>
    <div class="upload-file-area">
        <input type="file" @change="handleChange" />
        <p><b>Opções aceitas:</b> .csv ou .pdf</p>
        <button @click="handleUploadFile" class="btn-primary">Enviar</button>
    </div>
</template>

<style scoped>
.upload-file-area {
    display: flex;
    background-color: rgb(255, 255, 255, 0.1);
    flex-direction: column;
    align-items: center;
    padding: 1em;
    border: 1px solid var(--secondary);
    border-radius: 4px;
    gap: 1rem;
}

.upload-file-area input {
    padding: 0.5rem 1rem;
    border: 1px solid var(--secondary);
}
</style>