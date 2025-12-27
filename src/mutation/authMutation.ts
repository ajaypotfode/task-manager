import { useMutation } from "@tanstack/react-query";
import { createUserAPI, loginUserAPI } from "../app/service/usersApiService";
import { CreateUserPayload } from "../types/auth";

export const useLoginMutation = () => {
    return useMutation({
        mutationFn: async (payload: { password: string, email: string }) => {
            return loginUserAPI(payload)
        }
    }
    )
}

export const useCreateUserMutation = () => {
    return useMutation({
        mutationFn: async (payload: CreateUserPayload) => {
            return createUserAPI(payload)
        }
    }
    )
}