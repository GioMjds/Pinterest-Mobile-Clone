import { httpClient } from "@/configs/axios";

class AuthService {
    async login() {
        return httpClient.get("/auth/login");
    }
}

export const auth = new AuthService();