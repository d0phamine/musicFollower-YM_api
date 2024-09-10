import { makeAutoObservable } from 'mobx'

export const authStore:unknown = makeAutoObservable({
    username: "",
    password: ""
})