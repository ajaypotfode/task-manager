import { atom } from "jotai";

interface ModalType {
    title: string;
    message: string;
    buttonText?: string
}


export const isModalOpenAtom = atom<boolean>(false)
export const modalAtom = atom<ModalType>({
    title: '',
    message: '',
    buttonText: 'Close'
});

export const openModalAtom = atom(
    undefined,
    (get, set, data: ModalType) => {
        const currentModal = get(isModalOpenAtom);
        set(isModalOpenAtom, !currentModal);
        set(modalAtom, data)
    }
)

export const closeModalAtom = atom(
    undefined,
    (get, set) => {
        const currentModal = get(isModalOpenAtom);
        set(isModalOpenAtom, !currentModal);
        set(modalAtom, {
            title: '',
            message: '',
            buttonText: 'Close'
        }
        )
    }
)