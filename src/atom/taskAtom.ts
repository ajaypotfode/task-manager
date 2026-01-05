import { atom } from "jotai";
import { SummaryType, Task, TaskPayload } from "../types/task";

export const taskPayloadAtom = atom<TaskPayload>({
    title: '',
    description: '',
    date: '',
    time: '',
    category: '',
    priority: '',
});

export const taskListAtom = atom<Task[]>([]);

export const recentTasksAtom = atom<Task[]>([]);

export const formValidAtom = atom<boolean>(false);

export const voiceTaskPayloadAtom = atom<string>('');

export const summaryAtom = atom<SummaryType | null>(null);