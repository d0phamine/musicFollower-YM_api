import { createContext, useContext } from "react";
import { authStore } from "./authStore";
import { notificationStore } from "./notificationStore";
import { userStore } from "./userStore";
import { imagesStore } from "./imagesStore";

export const rootStoreContext = createContext({
	authStore: new authStore(),
	notificationStore: new notificationStore(),
	userStore: new userStore(),
	imagesStore: new imagesStore(),
});

export const useStores = () => useContext(rootStoreContext);
