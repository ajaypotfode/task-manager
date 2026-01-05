import { atom } from "jotai";
import { Category } from "../types/category";

export const categoriesAtom = atom<Category[]>([]);
export const categoryPayloadAtom = atom<string>('');
export const categoryFormAtom = atom<boolean>(false);