import { API_URL } from "@/config/constants";
import axios from "axios";

export const refreshClient = axios.create({
    baseURL: `${API_URL}/v1`,
    headers: {
        "Content-Type": "application/json",
    },
});

refreshClient.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
)