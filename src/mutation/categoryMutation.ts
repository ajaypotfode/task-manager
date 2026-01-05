import { useMutation } from "@tanstack/react-query"
import { createCategoryAPI, deleteCategoryAPI, getCategoryAPI, getCategoryByIdAPI, updateCategoryAPI } from "../service/categoryApiService";
// import { createTaskAPI, deleteTaskAPI, getTaskAPI, markAsCompletetaskAPI } from "../service/taskApiService"
// import { TaskPayload } from "../types/task";

export const useCategoriesMutation = () => {
    return useMutation({
        mutationFn: async () => {
            return getCategoryAPI();
        }
    }
    )
}

export const useCreateCategoryMutation = () => {
    return useMutation({
        mutationFn: async (name: string) => {
            return createCategoryAPI(name)
        }
    }
    )
}


export const useDaleteCategoryMutation = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            return deleteCategoryAPI(id);
        }
    }
    )
}


export const useGetCategoryMutation = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            return getCategoryByIdAPI(id);
        }
    }
    )
}

export const useUpdateCategoryMutation = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            return updateCategoryAPI(id);
        }
    }
    )
}