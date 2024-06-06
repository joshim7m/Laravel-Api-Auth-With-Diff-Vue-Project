<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="login">
            <div>
                <label>Email</label>
                <input type="email" v-model="email">
            </div>
            <div>
                <label>Password</label>
                <input type="password" v-model="password">
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import { useAuthStore } from '../store/authStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const email = ref('robin@exe.com');
        const password = ref('carbon123');
        const authStore = useAuthStore();
        const router = useRouter();

        const login = async () => {
            try {
                await authStore.login({ email: email.value, password: password.value });
               router.push({ name: 'Dashboard' });
            } catch (error) {
                console.error(error);
            }
        };

        return { email, password, login };
    }
};
</script>
