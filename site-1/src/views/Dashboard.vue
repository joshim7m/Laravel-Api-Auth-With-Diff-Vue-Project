<template>
    <div>
        <h1>Dashboard</h1>
        <h2 v-if="currentUser">{{ currentUser.name }}</h2>
        <h2 v-else>Loading...</h2>

        <h2 v-if="authStore.isAuthenticated">Authenticated</h2>
        <button @click="logout">Logout</button>
    </div>
</template>

<script>
import { useAuthStore } from '../store/authStore';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const authStore = useAuthStore();
        const router = useRouter();
        const currentUser = computed(() => authStore.currentUser);

        onMounted(async () => {
            if (!authStore.currentUser) {
                try {
                    await authStore.fetchUser();
                } catch (error) {
                    console.error('Failed to fetch user:', error);
                }
            }
        });

        const logout = async () => {
            try {
                await authStore.logout();
                router.push({ name: 'Login' });
            } catch (error) {
                console.error(error);
            }
        };

        return { currentUser, logout, authStore };
    }
};
</script>
