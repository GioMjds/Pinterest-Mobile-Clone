import { httpClient } from "@/configs/axios";

class AuthService {
    async login(email: string, password: string) {
        return httpClient.post("/auth/login", {
            email: email,
            password: password
        });
    }

    async logout() {
        return httpClient.post("/auth/logout");
    }

    async sendRegisterOtp(email: string, username: string, first_name: string, last_name: string, password: string, confirmPassword: string) {
        return httpClient.post("/auth/register", {
            email: email,
            username: username,
            first_name: first_name,
            last_name: last_name,
            password: password,
            confirm_password: confirmPassword
        });
    }

    async verifyRegisterOtp(email: string, username: string, first_name: string, last_name: string, password: string, otp: string) {
        return httpClient.post("/auth/verify_otp", {
            email: email,
            username: username,
            first_name: first_name,
            last_name: last_name,
            password: password,
            otp: otp
        });
    }
}

export const auth = new AuthService();