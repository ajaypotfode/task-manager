import { Task, TaskPayload } from "@/src/types/task";
import axios from "axios";

interface GetTaskResponse {
    message: string;
    success: boolean;
    task?: Task[];
    error?: unknown;

}

export const getTaskAPI = async (): Promise<GetTaskResponse> => {
    // const data = JSON.stringify(loginData)
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `/api/task`,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    try {
        const response = await axios.request<GetTaskResponse>(config)
        return response.data
    } catch (error: unknown) {
        throw error;
    }
}


interface CreateTaskResponse {
    message: string;
    success: boolean;
    task?: Task;
    error?: unknown;

}

export const createTaskAPI = async (payload: TaskPayload): Promise<CreateTaskResponse> => {
    const data = JSON.stringify(payload)
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `/api/task`,
        headers: {
            'Content-Type': 'application/json',
        },
        data
    };

    try {
        const response = await axios.request<CreateTaskResponse>(config)
        return response.data
    } catch (error: unknown) {
        throw error;
    }
}


interface DeleteTaskResponse {
    message: string;
    success: boolean;
    task?: Task;
    error?: unknown;

}

export const deleteTaskAPI = async (id: string): Promise<DeleteTaskResponse> => {
    const config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `/api/task?id=${id}`,
        headers: {
            'Content-Type': 'application/json',
        }
    }

    try {
        const response = await axios.request<DeleteTaskResponse>(config)
        return response.data
    } catch (error: unknown) {
        throw error;
    }
}


interface MarkAsCompletetaskResponse {
    message: string;
    success: boolean;
    task?: Task;
    error?: unknown;

}

export const markAsCompletetaskAPI = async (id: string): Promise<MarkAsCompletetaskResponse> => {
    const config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: `/api/task/markComplete?id=${id}`,
        headers: {
            'Content-Type': 'application/json',
        }
    }

    try {
        const response = await axios.request<MarkAsCompletetaskResponse>(config)
        return response.data
    } catch (error: unknown) {
        throw error;
    }
}