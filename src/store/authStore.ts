import { makeAutoObservable } from 'mobx';

export interface IAuth {
    username: string,
    password: string,
    registered: boolean
}

export class authStore{
    public authData: IAuth = {
        username: '',
        password: '',
        registered: false
    }

    constructor() {
        makeAutoObservable(this); // Делаем все поля и методы реактивными
      }

    public getAuthCreds(username:string, password:string){
        this.authData.username = username
        this.authData.password = password
    }

    public changeRegistered(){
        this.authData.registered = !this.authData.registered
    }
      
}