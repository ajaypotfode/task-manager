import { Category } from "@/src/types/category";
import { Task, TaskPayload } from "@/src/types/task";
import axios from "axios";

interface GetCategoryResponse {
    message: string;
    success: boolean;
    categories: Category[];
    error?: unknown;

}

export const getCategoryAPI = async (): Promise<GetCategoryResponse> => {
    // const data = JSON.stringify(loginData)
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `/api/category`,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    try {
        const response = await axios.request<GetCategoryResponse>(config)
        return response.data
    } catch (error: unknown) {
        throw error;
    }
}


interface GetCategoryByIdResponse {
    message: string;
    success: boolean;
    category?: Category[];
    error?: unknown;

}

export const getCategoryByIdAPI = async (id: string): Promise<GetCategoryByIdResponse> => {
    // const data = JSON.stringify(loginData)
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `/api/category/:${id}`,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    try {
        const response = await axios.request<GetCategoryByIdResponse>(config)
        return response.data
    } catch (error: unknown) {
        throw error;
    }
}


interface CreateCategoryResponse {
    message: string;
    success: boolean;
    task?: Task;
    error?: unknown;

}

export const createCategoryAPI = async (name: string): Promise<CreateCategoryResponse> => {
    const data = JSON.stringify({ name })
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `/api/category`,
        headers: {
            'Content-Type': 'application/json',
        },
        data
    };

    try {
        const response = await axios.request<CreateCategoryResponse>(config)
        return response.data
    } catch (error: unknown) {
        throw error;
    }
}


interface DeleteCategoryResponse {
    message: string;
    success: boolean;
    task?: Task;
    error?: unknown;

}

export const deleteCategoryAPI = async (id: string): Promise<DeleteCategoryResponse> => {
    const config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `/api/category?id=${id}`,
        headers: {
            'Content-Type': 'application/json',
        }
    }

    try {
        const response = await axios.request<DeleteCategoryResponse>(config)
        return response.data
    } catch (error: unknown) {
        throw error;
    }
}


interface UpdateCategoryResponse {
    message: string;
    success: boolean;
    task?: Task;
    error?: unknown;

}

export const updateCategoryAPI = async (id: string): Promise<UpdateCategoryResponse> => {
    const config = {
        method: 'update',
        maxBodyLength: Infinity,
        url: `/api/category?id=${id}`,
        headers: {
            'Content-Type': 'application/json',
        }
    }

    try {
        const response = await axios.request<UpdateCategoryResponse>(config)
        return response.data
    } catch (error: unknown) {
        throw error;
    }
}