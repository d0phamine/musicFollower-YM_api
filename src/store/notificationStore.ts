import { makeAutoObservable } from "mobx";

export interface INotification {}

export class notificationStore {
	public notificationData: INotification = {};

	constructor() {
		makeAutoObservable(this); // Делаем все поля и методы реактивными
	}
}
