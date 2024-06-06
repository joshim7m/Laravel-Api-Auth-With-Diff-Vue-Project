<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="register">
            <div>
                <label>Name</label>
                <input type="text" v-model="name">
            </div>
            <div>
                <label>Email</label>
                <input type="email" v-model="email">
            </div>
            <div>
                <label>Password</label>
                <input type="password" v-model="password">
            </div>
            <div>
                <label>Confirm Password</label>
                <input type="password" v-model="password_confirmation">
            </div>
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script>
import { useAuthStore } from '../store/authStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const name = ref('');
        const email = ref('');
        const password = ref('');
        const password_confirmation = ref('');
        const authStore = useAuthStore();
        const router = useRouter();

        const register = async () => {
            try {
                await authStore.register({
                    name: name.value,
                    email: email.value,
                    password: password.value,
                    password_confirmation: password_confirmation.value
                });
                router.push({ name: 'Login' });
            } catch (error) {
                console.error(error);
            }
        };

        return { name, email, password, password_confirmation, register };
    }
};
</script>
