import { atom } from "jotai";
import { CreateUserPayload, User } from "../types/auth";

export const loginDataAtom = atom<{ password: string, email: string }>(
    {
        email: '',
        password: ''
    }
);

export const signUpDataAtom = atom<CreateUserPayload>({
    name: '',
    userName: '',
    password: '',
    email: '',
    image: ''
})

export const loggedInUserAtom = atom<User>()