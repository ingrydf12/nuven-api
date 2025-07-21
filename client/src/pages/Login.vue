<script setup>
import TextField from '../components/TextField.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../service/authService';
import '../authStyle.css';

const email = ref('');
const password = ref('');

const router = useRouter();

const handleLogin = async () => {
    try {
        const response = await login(email.value, password.value);

        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));

        navigateToDashboard();
    } catch (error) {
        console.error('Erro no login:', error);
    }
};

const navigateToDashboard = () => {
    router.push('/document-dashboard');
};

const navigateToRegister = () => {
    router.push('/register');
};

</script>

<template>
    <div class="auth-page">
        <div class="left-side">
            <img src="https://github.com/ingrydf12/nuven-api/blob/master/client/public/labnuven.png?raw=true"
                alt="Logo Nuven" />
            <h1>Login</h1>
        </div>
        <div class="right-side">
            <h3>Email</h3>
            <TextField v-model="email" placeholder="Digite seu email" />
            <h3>Senha</h3>
            <TextField v-model="password" placeholder="Digite sua senha" type="password" />
            <button @click="handleLogin">Entrar</button>
            <div class="register-link">
                <p>Não tem uma conta? <a @click.prevent="navigateToRegister">Registrar</a></p>
            </div>
        </div>
    </div>
</template>