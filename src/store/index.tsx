import { createContext, useContext } from "react";
import { authStore } from "./authStore";
import { notificationStore } from "./notificationStore";

export const rootStoreContext = createContext({
	authStore: new authStore(),
	notificationStore: new notificationStore(),
});

export const useStores = () => useContext(rootStoreContext);
