import { FC } from "react";
import { YMApi } from "ym-api";
const api = new YMApi();


export const initApi = async (username:string, password:string) => {
    console.log(username, password)
	// try {
	// 	await api.init({ username: "example@yandex.ru", password: "password" });
	// } catch (e:any) {
	// 	console.log(`api error ${e.message}`)
	// }
};

