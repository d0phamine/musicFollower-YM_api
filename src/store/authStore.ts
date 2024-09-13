import { makeAutoObservable } from 'mobx';

export interface IAuth {
    token:string | null
    registered: boolean
}

export class authStore{
    public authData:IAuth = {
        token: null,
        registered: false
    }

    constructor() {
        makeAutoObservable(this); // Делаем все поля и методы реактивными
      }

    public setToken(token:string){
        this.authData.token = token
        localStorage.setItem('token', token)
    }

    public getToken(): string | null {
        // Если токен уже есть в памяти, возвращаем его
        if (this.authData.token) {
          return this.authData.token;
        }
        // Если токена в памяти нет, пробуем достать его из localStorage
        this.authData.token = localStorage.getItem('token');
        return this.authData.token;
      }

    public clearToken(){
        this.authData.token = null
        localStorage.removeItem('token')
    }
    
    public changeRegistered(){
        this.authData.registered = !this.authData.registered
    }
      
}