import { useMutation } from "@tanstack/react-query"
import { createTaskAPI, deleteTaskAPI, getRecentTask, getTaskAPI, getWeeklySummaryAPI, markAsCompletetaskAPI } from "../service/taskApiService"
import { TaskPayload } from "../types/task";

export const useGetTaskListMutation = () => {
    return useMutation({
        mutationFn: async (type: string) => {
            return getTaskAPI(type);
        }
    }
    )
}

export const useGetRecentTasksMutation = () => {
    return useMutation({
        mutationFn: async () => {
            return getRecentTask()
        }
    }
    )
}

export const useCreateTaskMutation = () => {
    return useMutation({
        mutationFn: async (taskPayload: TaskPayload) => {
            return createTaskAPI(taskPayload);
        }
    }
    )
}


export const useDaleteTaskMutation = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            return deleteTaskAPI(id);
        }
    }
    )
}


export const useMarkAsCompleteMutation = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            return markAsCompletetaskAPI(id);
        }
    }
    )
}


export const useGetSummaryMutation = () => {
    return useMutation({
        mutationFn: async () => {
            return getWeeklySummaryAPI();
        }
    }
    )
}