import { FC } from "react";
import axios from 'axios'

export const HandleRegister = async (username:string, password:string) => {
    try {
        const res = await axios.post('http://localhost:4000/api/register', {username, password})
        return(res.data.registered)
    } catch (e) {
        console.log(e)
    }
}