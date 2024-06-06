<template>
    <div>
        <h1>Home</h1>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
        <router-link v-if="isAuthenticated" to="/dashboard">Dashboard</router-link>
    </div>
</template>

<script>
import { useAuthStore } from '../store/authStore';
import { computed } from 'vue';

export default {
    setup() {
        const authStore = useAuthStore();
        const isAuthenticated = computed(() => authStore.isAuthenticated);
        return { isAuthenticated };
    }
};
</script>
