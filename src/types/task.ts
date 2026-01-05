export interface Task {
    _id: string;
    userId: string,
    title: string,
    description: string,
    date: string,
    time: string,
    category: {
        _id: string;
        name: string;
        taskCount: number;
        color: string;
    },
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
    time: string;
    category: string,
    priority: string,
}

export interface SummaryType {
    taskCount: number;
    completedTask: number;
    pendingTask: number;
    completedPercent: number;
    pendingPercent: number;
    chartData: {
        day: string;
        complete: number;
        pending: number;
    }[]
}