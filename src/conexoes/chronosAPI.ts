import axios from 'axios';

export const chronosAPI = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL })