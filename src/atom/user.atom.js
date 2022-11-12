
import { atom } from "recoil"

export const initialUserState = {
    id: null,
    name: null,
}

export const userAtom = atom({
    key: "usetState",
    default: initialUserState
})

export const keepId = atom({
    key: "loginState",
    default: false
})