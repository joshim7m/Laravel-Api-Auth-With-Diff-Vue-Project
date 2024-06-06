import { defineStore } from 'pinia';
import apiClient from '../axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('access_token') || ''
    }),
    actions: {
        async register(user) {
            await apiClient.post('/register', user);
        },
        async login(credentials) {
            const response = await apiClient.post('/login', credentials);
            this.token = response.data.access_token;
            localStorage.setItem('access_token', this.token);
            await this.fetchUser();
        },
        async fetchUser() {
            const response = await apiClient.get('/user', {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            });
            this.user = response.data;
        },
        async logout() {
            await apiClient.post('/logout', null, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            });
            this.user = null;
            this.token = '';
            localStorage.removeItem('access_token');
        }
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
        currentUser: (state) => state.user
    }
});
