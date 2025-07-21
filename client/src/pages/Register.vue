<script setup>
import TextField from '../components/TextField.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { register } from '../service/authService';

const nome = ref('');
const email = ref('');
const password = ref('');

const router = useRouter();

const handleRegister = async () => {
    try {
        const user = await register(nome.value, email.value, password.value);
        localStorage.setItem('user', JSON.stringify(user));
        navigateToLogin();
    } catch (error) {

        console.error('Erro no registro:', error);
    }
};

const navigateToLogin = () => {
    router.push('/login');
};

</script>

<template>
    <div class="auth-page">
        <div class="left-side">
            <img src="https://github.com/ingrydf12/nuven-api/blob/master/client/public/labnuven.png?raw=true"
                alt="Logo Nuven" />
            <h1>Registre-se na nossa plataforma</h1>
        </div>
        <div class="right-side">
            <h3>Nome</h3>
            <TextField v-model="nome" placeholder="Insira seu nome" />
            <h3>Email</h3>
            <TextField v-model="email" placeholder="Insira seu email" />
            <h3>Senha</h3>
            <TextField v-model="password" placeholder="Insira sua senha" type="password" />
            <button @click="handleRegister">Registrar</button>
            <div class="register-link">
                <p>Já tem uma conta? <a @click.prevent="navigateToLogin">Entrar</a></p>
            </div>
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
    word-wrap: break-word;
}

.left-side h1 {
    margin-bottom: 1rem;
    word-wrap: break-word;
    max-width: 50%;
}

.right-side {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
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

.register-link:hover {
    cursor: pointer;
}
</style>