<script setup>
import { ref } from 'vue';
import { getUserProfile } from '../service/userService';

const user = ref(null);
const token = ref(localStorage.getItem('token') || '');
const fetchUserProfile = async () => {
    try {
        user.value = await getUserProfile(token);
    } catch (error) {
        console.error('Deu erro ao puxar as infos do usuário:', error);
    }
};
fetchUserProfile();
</script>

<template>
    <div class="right-bar">
        <img src="https://github.com/ingrydf12/nuven-api/blob/master/client/public/labnuven.png?raw=true" alt="Logo Nuven" class="neon-background" />
        <h2>Perfil do Usuário</h2>
        <h3>Meu usuário</h3>
        <div v-if="user">
            <p><strong>ID:</strong> {{ user.id }}</p>
            <p><strong>Nome:</strong> {{ user.name }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
        </div>
    </div>
</template>

<style scoped>
.right-bar {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100vh;
    padding: 16px;
    background-color: #090922;
    border-left: 1px solid #eee;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    z-index: 1000;
}

.right-bar img {
    width: 100%;
    height: auto;
    margin-bottom: 16px;
}

.right-bar .neon-background {
    animation: blinkNeonNuven 2s infinite alternate;
}

@keyframes blinkNeonNuven {

    0%,
    100% {
        filter: drop-shadow(0 0 5px var(--secondary)) drop-shadow(0 0 10px var(--secondary));
    }

    50% {
        filter: drop-shadow(0 0 2px var(--secondary)) drop-shadow(0 0 5px var(--secondary));
    }
}

.right-bar h2 {
    margin-top: 0;
}

.right-bar p {
    margin: 4px 0;
}
</style>