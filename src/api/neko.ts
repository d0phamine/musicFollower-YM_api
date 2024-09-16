import { FC } from "react";
import axios from "axios"
 
export const getNekos = async(offset = 0, limit = 3, rating = ['safe']) => {
    try {
        const res  = await axios.get("https://api.nekosapi.com/v3/images/random", {
            params: { offset, limit, rating },
        })
        return res.data.items
    } catch(error:any) {
        if (axios.isAxiosError(error) && error.response){
            return error.response.data
        } else {
            console.log(error, "unidentified")
        }
    }
}