import { FC } from "react";
import { YMApi } from "ym-api";

const api = new YMApi();


export const initApi = async (email:string, password:string) => {
    console.log(email, password)
	try {
		await api.init({ username: email, password: password });
	} catch (e:any) {
		console.log(`api error ${e.message}`)
	}
};

