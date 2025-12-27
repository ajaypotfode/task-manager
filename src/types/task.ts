export interface Task {
    _id: string;
    userId: string,
    title: string,
    description: string,
    date: string,
    time: string,
    category: string,
    isComplete: boolean,
    priority: string,
    day: string,
    createdAt: string;
    updatedAt: string;
}


export interface TaskPayload {
    title: string,
    description: string,
    date: string,
    category: string,
    priority: string,
}