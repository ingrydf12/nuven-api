<script setup>
import RightBar from '../components/RightBar.vue';
import UploadFileArea from '../components/UploadFileArea.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToMyDatasets = () => {
    router.push('/my-datasets');
};

const navigateToMyHistory = () => {
    router.push('/my-history');
};

</script>

<template>
    <div class="document-dashboard">
        <h1>Dashboard de Documentos</h1>

        <div class="actions-dashboard">
            <div class="upload-docs">
                <h2>Inserir novos documentos</h2>
                <UploadFileArea />
            </div>

            <div class="document-list">
                <h2>Meus datasets</h2>
                <button @click="navigateToMyDatasets" class="btn-primary">Ver datasets</button>
            </div>

            <div class="querie-history">
                <h2>Seu histórico de consultas</h2>
                <button @click="navigateToMyHistory" class="btn-primary">Ver histórico</button>
            </div>
        </div>
        <RightBar />
    </div>
</template>

<style scoped>
.document-dashboard {
    padding: 2em;
    background-color: var(--background);
}

.document-dashboard h1 {
    font-size: 2em;
    margin-bottom: 1em;
    color: var(--text-color);
}

.actions-dashboard {
    display: flex;
    flex-direction: row;
    gap: 2em;
    align-items: top;
}

.upload-docs {
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    align-items: center;
    gap: 1rem;
}
</style>