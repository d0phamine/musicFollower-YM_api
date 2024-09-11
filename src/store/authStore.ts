import { makeAutoObservable } from 'mobx'

export interface IAuth {
    email: string,
    password: string
}

export class authStore{
    public authData: IAuth = {
        email: '',
        password: ''
    }

    public getAuthCreds(email:string, password:string){
        this.authData.email = email
        this.authData.password = password
    }
    
        
}