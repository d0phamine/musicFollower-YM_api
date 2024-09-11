import React, { createContext, useContext } from "react";
import { authStore } from "./authStore";

export const rootStoreContext = createContext({
    authStore: new authStore()
})

export const useStores = () => useContext(rootStoreContext);