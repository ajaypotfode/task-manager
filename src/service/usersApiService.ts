import { CreateUserPayload, User } from "@/src/types/auth";
import axios from "axios";

interface CreateUserResponse {
    message: string;
    success: boolean;
    user?: User;
    error?: unknown;

}

export const createUserAPI = async (body: CreateUserPayload): Promise<CreateUserResponse> => {
    const data = JSON.stringify(body)
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `/api/auth/signup`,
        headers: {
            'Content-Type': 'application/json',
        },
        data
    };

    try {
        const response = await axios.request<CreateUserResponse>(config)
        return response.data
    } catch (error: unknown) {
        throw error;
    }
}


interface LoginUserResponse {
    message: string;
    success: boolean;
    user?: User;
    error?: unknown;

}

export const loginUserAPI = async (body: { password: string, email: string }): Promise<LoginUserResponse> => {
    const data = JSON.stringify(body)
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `/api/auth/login`,
        headers: {
            'Content-Type': 'application/json',
        },
        data
    };

    try {
        const response = await axios.request<LoginUserResponse>(config)
        return response.data
    } catch (error: unknown) {
        throw error;
    }
}