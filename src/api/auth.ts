import { FC } from "react";
import axios from "axios"

export const HandleAuth = async (username:string, password:string) => {
    try{
        const res = await axios.post("http://localhost:4000/api/login",{
            username,
            password
        })
        return res.data
    } catch(error:any){
        if (axios.isAxiosError(error) && error.response) {
			// Если это ошибка запроса, и сервер вернул ответ
			return error.response.data; // Возвращаем данные с ошибкой, если нужно обработать их в UI
		} else {
			console.log("Неожиданная ошибка:", error); // Любые другие ошибки
		}
    }
}

