import { makeAutoObservable } from "mobx";

export interface IUser {
    id:string | null
    username:string | null
}

export class userStore{

    public userData:IUser = {
        id: "",
        username: "",
    }

    constructor(){
        makeAutoObservable(this)
    }

    public setUserData(username:string, id:string){
        this.userData.username = username
        this.userData.id = id
        localStorage.setItem('username', username)
        localStorage.setItem('id', id)
    }

    public clearUserData(){
        this.userData.id = ""
        this.userData.username = ""
        localStorage.removeItem('username')
        localStorage.removeItem('id')
    }

    public getUserData(){
        if (this.userData.username && this.userData.id){
            return(this.userData.username, this.userData.id)
        }

        this.userData.username = localStorage.getItem('username')
        this.userData.id = localStorage.getItem('id')
        return (this.userData.username, this.userData.id)
    }
}
