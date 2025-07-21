<script setup>
import TextField from '../components/TextField.vue';
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const login = () => {
    // Handle login logic here
};
</script>

<template>
    <div class="auth-page">
        <div class="left-side">
            <img src="" alt="Logo Nuven" />
            <h1>Login</h1>
        </div>
        <div class="right-side">
            <TextField v-model="email" placeholder="Digite seu email" />
            <TextField v-model="password" placeholder="Digite sua senha" type="password" />
            <button @click="login">Entrar</button>
        </div>
    </div>
</template>

<style scoped>
h1 {
    font-size: 3em;
    margin-bottom: 0.5em;
}

.auth-page {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: var(--background);
}

.left-side {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.right-side {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.auth-page button {
    background-color: var(--secondary);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.8rem 3rem;
    font-size: 1em;
    cursor: pointer;
}

.auth-page button:hover {
    background-color: darken(var(--secondary), 50%);
}
</style>