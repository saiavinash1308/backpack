import { atom } from "recoil";

export const ItemState = atom<null | string>({
    key: "ItemState",
    default: null
})