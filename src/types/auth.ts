export interface User {
    _id: string;
    name: string,
    userName: string,
    password: string,
    email: string,
    image: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateUserPayload {
    name: string,
    userName: string,
    password: string,
    email: string,
    image: string
}